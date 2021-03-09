class Dropdown {
  static expandButtonClass = 'js-dropdown__expand-button';
  static dropdownExpandedClass = 'dropdown_expanded';
  static expandButtonRotatedClass = 'dropdown__expand-button_rotated';
  static menuItemClass = 'js-dropdown__menu-item';
  static decreaseButtonClass = 'js-dropdown__decrease';
  static decreaseButtonDisabledClass = 'dropdown__decrease_disabled';
  static increaseButtonClass = 'js-dropdown__increase';
  static increaseButtonDisabledClass = 'dropdown__increase_disabled';
  static amountClass = 'js-dropdown__amount';
  static clearButtonClass = 'js-dropdown__clear-button';
  static appendButtonClass = 'js-dropdown__apply-button';
  static inputTextClass = 'js-dropdown__text';
  static fieldClass = 'js-dropdown__field';

  constructor(element, withButtons, textInInputIsTotalAmount) {
    this.element = element;
    this.withButtons = withButtons;
    this.init(textInInputIsTotalAmount);
  }

  init(textInInputIsTotalAmount) {
    this.totalAmount = 0;
    this.inputField = this.element.querySelector(`.${Dropdown.inputTextClass}`);
    this.expandButton = this.element.querySelector(`.${Dropdown.expandButtonClass}`);
    this.field = this.element.querySelector(`.${Dropdown.fieldClass}`);
    this.field.addEventListener('click', this.handleExpandButtonClick);
    window.addEventListener('click', this.handleWindowClick);
    this.initText(textInInputIsTotalAmount);
    this.initItems();
    if (this.withButtons) {
      this.addButtonsListeners();
    }
    this.currentSetInputTextFunction();
  }

  initItems() {
    this.itemsDomElementsArray = this.element.querySelectorAll(`.${Dropdown.menuItemClass}`);
    this.items = new Map();
    this.itemsDomElementsArray.forEach((itemElement) => {
      const itemId = itemElement.getAttribute('data-id');
      this.items.set(
        itemId,
        {
          forms: itemElement.getAttribute('data-forms').split(','),
          minAmount: +itemElement.getAttribute('data-min-amount'),
          maxAmount: +itemElement.getAttribute('data-max-amount'),
          amount: +itemElement.querySelector(`.${Dropdown.amountClass}`).innerText,
          amountContainsElement: itemElement.querySelector(`.${Dropdown.amountClass}`),
          decreaseButton: itemElement.querySelector(`.${Dropdown.decreaseButtonClass}`),
          increaseButton: itemElement.querySelector(`.${Dropdown.increaseButtonClass}`),
        },
      );
      const currentItem = this.items.get(itemId);
      this.totalAmount += +currentItem.amount;
      this.toggleDisabledButton(+currentItem.amount,
        currentItem.minAmount, currentItem.maxAmount, currentItem);
      const {decreaseButton} = this.items.get(itemId);
      decreaseButton.addEventListener('click', this.handleDecreaseButtonClick);
      const {increaseButton} = this.items.get(itemId);
      increaseButton.addEventListener('click', this.handleIncreaseButtonClick);
    });
  }

  initText(textInInputIsTotalAmount) {
    this.generalForms = this.element.getAttribute('data-forms') || 'элемент, элемента, элементов';
    this.generalForms = this.generalForms.split(',');
    this.placeholder = this.element.getAttribute('data-placeholder');
    if (textInInputIsTotalAmount) {
      this.currentSetInputTextFunction = this.setSelectedTextByTotalAmount;
    } else {
      this.currentSetInputTextFunction = this.setSelectedText;
    }
  }

  handleWindowClick = (event) => {
    if (!this.element.contains(event.target)) {
      this.closeDropdown();
    }
  }

  addButtonsListeners() {
    this.clearButton = this.element.querySelector(`.${Dropdown.clearButtonClass}`);
    this.clearButton.addEventListener('click', this.handleClearButtonClick);
    this.applyButton = this.element.querySelector(`.${Dropdown.appendButtonClass}`);
    this.applyButton.addEventListener('click', this.handleApplyButtonClick);
    this.toggleClearButtonVisibility();
  }

  handleApplyButtonClick = (event) => {
    event.preventDefault();
    this.closeDropdown();
  }

  handleClearButtonClick = (event) => {
    event.preventDefault();
    if (this.totalAmount > 0) {
      this.totalAmount = 0;
      Array.from(this.items.keys()).forEach((key) => {
        this.setAmount(key, 0);
      });
      this.toggleClearButtonVisibility();
    }
  }

  handleExpandButtonClick = (event) => {
    event.preventDefault();
    if (this.element.classList.contains(Dropdown.dropdownExpandedClass)) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  handleDecreaseButtonClick = (event) => {
    event.preventDefault();
    const itemDOMElement = event.target.closest(`.${Dropdown.menuItemClass}`);
    const itemId = itemDOMElement.getAttribute('data-id');
    const item = this.items.get(itemId);
    if (this.items.get(itemId).amount !== item.minAmount) {
      this.totalAmount -= 1;
      this.setAmount(itemId, item.amount - 1);
      if (this.withButtons) {
        this.toggleClearButtonVisibility();
      }
    }
  }

  handleIncreaseButtonClick = (event) => {
    event.preventDefault();
    const itemDOMElement = event.target.closest(`.${Dropdown.menuItemClass}`);
    const itemId = itemDOMElement.getAttribute('data-id');
    const item = this.items.get(itemId);
    if (this.items.get(itemId).amount !== item.maxAmount) {
      this.totalAmount = +this.totalAmount + 1;
      this.setAmount(itemId, +item.amount + 1);
      if (this.withButtons) {
        this.toggleClearButtonVisibility();
      }
    }
  }

  openDropdown() {
    this.element.classList.add(Dropdown.dropdownExpandedClass);
    this.expandButton.classList.add(Dropdown.expandButtonRotatedClass);
  }

  closeDropdown() {
    this.element.classList.remove(Dropdown.dropdownExpandedClass);
    this.expandButton.classList.remove(Dropdown.expandButtonRotatedClass);
  }

  toggleDisabledButton(amount, minAmount, maxAmount, item) {
    const {decreaseButton} = item;
    const {increaseButton} = item;
    let isDisabledClassShouldBeDeleted = amount !== minAmount
      && decreaseButton.classList.contains(Dropdown.decreaseButtonDisabledClass);
    if (amount === minAmount) {
      decreaseButton.classList.add(Dropdown.decreaseButtonDisabledClass);
    } else if (isDisabledClassShouldBeDeleted) {
      decreaseButton.classList.remove(Dropdown.decreaseButtonDisabledClass);
    }
    isDisabledClassShouldBeDeleted = amount !== maxAmount
      && increaseButton.classList.contains(Dropdown.increaseButtonDisabledClass);
    if (amount === maxAmount) {
      increaseButton.classList.add(Dropdown.increaseButtonDisabledClass);
    } else if (isDisabledClassShouldBeDeleted) {
      increaseButton.classList.remove(Dropdown.increaseButtonDisabledClass);
    }
  }

  setSelectedTextByTotalAmount() {
    let result = '';
    if (this.totalAmount === 0) {
      result = this.placeholder;
    } else {
      result = `${this.totalAmount} ${this.getProperWordForm(this.totalAmount, this.generalForms)}`;
    }
    this.inputField.innerText = result;
  }

  setSelectedText() {
    let result = '';
    let flag = false;
    Array.from(this.items.keys()).forEach((key) => {
      const isCommaNeeded = result !== ''
        && this.items.get(key).amount !== 0;
      if (isCommaNeeded) {
        result += ', ';
      }
      if (this.items.get(key).amount === 0) {
        flag = true;
      } else {
        const {forms} = this.items.get(key);
        result += `${this.items.get(key).amount} ${this.getProperWordForm(this.items.get(key).amount, forms)}`;
      }
    });
    const isThreeDotsNeeded = flag === true && this.totalAmount > 0;
    if (isThreeDotsNeeded) {
      result += '...';
    }
    if (this.totalAmount === 0) {
      result = this.placeholder;
    }
    this.inputField.innerText = result;
  }

  getProperWordForm(number, forms) {
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

  setAmount(itemId, amount) {
    const item = this.items.get(itemId);
    item.amount = amount;
    item.amountContainsElement.innerText = this.items.get(itemId).amount;
    this.currentSetInputTextFunction();
    this.toggleDisabledButton(+this.items.get(itemId).amount,
      +this.items.get(itemId).minAmount, +this.items.get(itemId).maxAmount, this.items.get(itemId));
  }

  toggleClearButtonVisibility() {
    const isDisabledClassShouldDeleted = this.clearButton.classList.contains('dropdown__clear-button_hidden')
      && this.totalAmount !== 0;
    const isDisabledClassShouldAdded = !this.clearButton.classList.contains('dropdown__clear-button_hidden')
      && this.totalAmount === 0;
    if (isDisabledClassShouldDeleted) {
      this.clearButton.classList.remove('dropdown__clear-button_hidden');
    } else if (isDisabledClassShouldAdded) {
      this.clearButton.classList.add('dropdown__clear-button_hidden');
    }
  }

}

export default Dropdown;
