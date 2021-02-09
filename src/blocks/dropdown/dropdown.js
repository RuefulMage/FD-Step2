function createDropdown(element, withButtons, textInInputIsTotalAmount) {
  const expandButtonClass = 'js-dropdown__expand-button';
  const dropdownExpandedClass = 'dropdown_expanded';
  const expandButtonRotatedClass = 'dropdown__expand-button_rotated';
  const menuItemClass = 'js-dropdown__menu-item';
  const decreaseButtonClass = 'js-dropdown__decrease';
  const decreaseButtonDisabledClass = 'dropdown__decrease_disabled';
  const increaseButtonClass = 'js-dropdown__increase';
  const increaseButtonDisabledClass = 'dropdown__increase_disabled';
  const amountClass = 'js-dropdown__amount';
  const clearButtonClass = 'js-dropdown__clear-button';
  const appendButtonClass = 'js-dropdown__apply-button';
  const inputTextClass = 'js-dropdown__text';

  let generalForms = element.getAttribute('data-forms') || 'элемент, элемента, элементов';
  generalForms = generalForms.split(',');
  const placeholder = element.getAttribute('data-placeholder');
  const itemsDomElementsArray = element.querySelectorAll(`.${menuItemClass}`);
  const items = new Map();
  let totalAmount = 0;
  let currentSetInputTextFunction;
  const inputField = element.querySelector(`.${inputTextClass}`);

  let clearButton;
  let applyButton;
  if (textInInputIsTotalAmount) {
    currentSetInputTextFunction = setSelectedTextByTotalAmount;
  } else {
    currentSetInputTextFunction = setSelectedText;
  }

  const expandButton = element.querySelector(`.${expandButtonClass}`);
  expandButton.addEventListener('click', handleExpandButtonClick);
  itemsDomElementsArray.forEach((itemElement) => {
    const itemId = itemElement.getAttribute('data-id');
    items.set(
      itemId,
      {
        forms: itemElement.getAttribute('data-forms').split(','),
        minAmount: +itemElement.getAttribute('data-min-amount'),
        maxAmount: +itemElement.getAttribute('data-max-amount'),
        amount: +itemElement.querySelector(`.${amountClass}`).innerText,
        amountContainsElement: itemElement.querySelector(`.${amountClass}`),
        decreaseButton: itemElement.querySelector(`.${decreaseButtonClass}`),
        increaseButton: itemElement.querySelector(`.${increaseButtonClass}`),
      },
    );

    const currentItem = items.get(itemId);
    totalAmount += +currentItem.amount;
    toggleDisabledButton(+currentItem.amount,
      currentItem.minAmount, currentItem.maxAmount, currentItem);
    const { decreaseButton } = items.get(itemId);
    decreaseButton.addEventListener('click', handleDecreaseButtonClick);
    const { increaseButton } = items.get(itemId);
    increaseButton.addEventListener('click', handleIncreaseButtonClick);
  });

  if (withButtons) {
    clearButton = element.querySelector(`.${clearButtonClass}`);
    clearButton.addEventListener('click', handleClearButtonClick);
    applyButton = element.querySelector(`.${appendButtonClass}`);
    applyButton.addEventListener('click', handleApplyButtonClick);
    toggleClearButtonVisibility();
  }
  currentSetInputTextFunction();

  function handleApplyButtonClick(event) {
    event.preventDefault();
    element.classList.remove(dropdownExpandedClass);
    expandButton.classList.remove(expandButtonRotatedClass);
  }

  function handleClearButtonClick(event) {
    event.preventDefault();
    if (totalAmount > 0) {
      totalAmount = 0;
      Array.from(items.keys()).forEach((key) => {
        setAmount(key, 0);
      });
      toggleClearButtonVisibility();
    }
  }

  function handleExpandButtonClick(event) {
    event.preventDefault();
    if (element.classList.contains(dropdownExpandedClass)) {
      element.classList.remove(dropdownExpandedClass);
      expandButton.classList.remove(expandButtonRotatedClass);
    } else {
      element.classList.add(dropdownExpandedClass);
      expandButton.classList.add(expandButtonRotatedClass);
    }
  }

  function handleDecreaseButtonClick(event) {
    event.preventDefault();
    const itemDOMElement = this.closest(`.${menuItemClass}`);
    const itemId = itemDOMElement.getAttribute('data-id');
    const item = items.get(itemId);
    if (items.get(itemId).amount !== item.minAmount) {
      totalAmount -= 1;
      setAmount(itemId, item.amount - 1);
      if (withButtons) {
        toggleClearButtonVisibility();
      }
    }
  }

  function handleIncreaseButtonClick(event) {
    event.preventDefault();
    const itemDOMElement = this.closest(`.${menuItemClass}`);
    const itemId = itemDOMElement.getAttribute('data-id');
    const item = items.get(itemId);
    if (items.get(itemId).amount !== item.maxAmount) {
      totalAmount = +totalAmount + 1;
      setAmount(itemId, +item.amount + 1);
      if (withButtons) {
        toggleClearButtonVisibility();
      }
    }
  }

  function toggleDisabledButton(amount, minAmount, maxAmount, item) {
    const { decreaseButton } = item;
    const { increaseButton } = item;
    let isDisabledClassShouldBeDeleted = amount !== minAmount
            && decreaseButton.classList.contains(decreaseButtonDisabledClass);
    if (amount === minAmount) {
      decreaseButton.classList.add(decreaseButtonDisabledClass);
    } else if (isDisabledClassShouldBeDeleted) {
      decreaseButton.classList.remove(decreaseButtonDisabledClass);
    }
    isDisabledClassShouldBeDeleted = amount !== maxAmount
            && increaseButton.classList.contains(increaseButtonDisabledClass);
    if (amount === maxAmount) {
      increaseButton.classList.add(increaseButtonDisabledClass);
    } else if (isDisabledClassShouldBeDeleted) {
      increaseButton.classList.remove(increaseButtonDisabledClass);
    }
  }

  function setSelectedTextByTotalAmount() {
    let result = '';
    if (totalAmount === 0) {
      result = placeholder;
    } else {
      result = `${totalAmount} ${getProperWordForm(totalAmount, generalForms)}`;
    }
    inputField.innerText = result;
  }

  function setSelectedText() {
    let result = '';
    let flag = false;
    Array.from(items.keys()).forEach((key) => {
      const isCommaNeeded = result !== ''
          && items.get(key).amount !== 0;
      if (isCommaNeeded) {
        result += ', ';
      }
      if (items.get(key).amount === 0) {
        flag = true;
      } else {
        const { forms } = items.get(key);
        result += `${items.get(key).amount} ${getProperWordForm(items.get(key).amount, forms)}`;
      }
    });
    const isThreeDotsNeeded = flag === true && totalAmount > 0;
    if (isThreeDotsNeeded) {
      result += '...';
    }
    if (totalAmount === 0) {
      result = placeholder;
    }
    inputField.innerText = result;
  }

  function getProperWordForm(number, forms) {
    let result = '';
    let residue = number % 100;
    if (residue >= 11 && residue <= 19) {
      result = forms[2];
    } else {
      residue %= 10;
      switch (residue) {
        case (1):
          result = forms[0];
          break;
        case (2):
        case (3):
        case (4):
          result = forms[1];
          break;
        default:
          result = forms[2];
      }
    }
    return result;
  }

  function setAmount(itemId, amount) {
    const item = items.get(itemId);
    item.amount = amount;
    item.amountContainsElement.innerText = items.get(itemId).amount;
    currentSetInputTextFunction();
    toggleDisabledButton(+items.get(itemId).amount,
      +items.get(itemId).minAmount, +items.get(itemId).maxAmount, items.get(itemId));
  }

  function toggleClearButtonVisibility() {
    const isDisabledClassShouldDeleted = clearButton.classList.contains('dropdown__clear-button_hidden')
            && totalAmount !== 0;
    const isDisabledClassShouldAdded = !clearButton.classList.contains('dropdown__clear-button_hidden')
            && totalAmount === 0;
    if (isDisabledClassShouldDeleted) {
      clearButton.classList.remove('dropdown__clear-button_hidden');
    } else if (isDisabledClassShouldAdded) {
      clearButton.classList.add('dropdown__clear-button_hidden');
    }
  }
}

export default createDropdown;
