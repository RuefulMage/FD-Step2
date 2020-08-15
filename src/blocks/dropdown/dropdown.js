function createDropdown(element, withButtons, textInInputIsTotalAmount) {
    const expandButtonClass = 'js-dropdown__expand-button';
    const dropdownExpandedClass = 'dropdown_expanded';
    const expandButtonRotatedClass = 'dropdown__expand-button_rotated';
    const menuItemClass = 'js-dropdown-menu-item';
    const descreaseButtonClass = 'js-dropdown-descrease';
    const descreaseButtonDisabledClass = 'dropdown__descrease_disabled';
    const increaseButtonClass = 'js-dropdown-increase';
    const increaseButtonDisabledClass = 'dropdown__increase_disabled';
    const amountClass = 'js-dropdown-amount';
    const clearButtonClass = 'js-dropdown-clear-button';
    const appendButtonClass = 'js-append-button';
    const inputTextClass = 'js-dropdown__text';

    let generalForms = element.getAttribute('data-forms').split(',');
    let placeholder = element.getAttribute('data-placeholder');
    let itemsDomElementsArray = element.querySelectorAll('.' + menuItemClass);
    let items = new Map();
    let totalAmount = 0;
    let currentSetInputTextFunction;

    // Присвоение нужной функции для изменения поле инпута
    if(textInInputIsTotalAmount){
        currentSetInputTextFunction = setSelectedTextByTotalAmount;
    } else {
        currentSetInputTextFunction = setSelectedText;
    }

    // Навешивание обработчика событий на конпку скрытия/раскрытия дропдауна
    let expandButton = element.querySelector('.' + expandButtonClass);
    expandButton.addEventListener('click', expandButtonClickHandler);

    // Создание объектов items из массива DOM-элементов itemsDomElementsArray
    itemsDomElementsArray.forEach(item => {
        let itemId = item.getAttribute('data-id');
        items.set(
            itemId,
            {
                'forms': item.getAttribute('data-forms').split(','),
                'minAmount': +item.getAttribute('data-min-amount'),
                'maxAmount': +item.getAttribute('data-max-amount'),
                'amount': +item.querySelector('.' + amountClass).innerText,
            });

        let currentItem = items.get(itemId);
        totalAmount = totalAmount + +currentItem['amount'];
        toggleDisabledButton(+currentItem['amount'], currentItem['minAmount'], currentItem['maxAmount'], item);

        // Навешивание обработчика на кнопку уменьшения
        let descreaseButton = item.querySelector('.' + descreaseButtonClass);
        descreaseButton.addEventListener('click', descreaseButtonClickHandler);

        //Навешивание обработчика на кнопку увеличения
        let increaseButton = item.querySelector('.' + increaseButtonClass);
        increaseButton.addEventListener('click', increaseButtonClickHandler);
    });



    // Создание и навешивание обработчиков на кнопки Очистить и Принять
    if(withButtons) {
        let clearButton = element.querySelector('.' + clearButtonClass);
        clearButton.addEventListener('click', clearButtonClickHandler);

        let applyButton = element.querySelector('.' + appendButtonClass);
        applyButton.addEventListener('click', applyButtonClickHandler);

    }

    toggleClearButtonVisibility();
    currentSetInputTextFunction();





    
    //Дальше идут вспомогательные функции
    function applyButtonClickHandler(event) {
        event.preventDefault();
        element.classList.remove(dropdownExpandedClass);
        expandButton.classList.remove(expandButtonRotatedClass);
    }


    function clearButtonClickHandler(event) {
        event.preventDefault();
        if (totalAmount > 0) {
            totalAmount = 0;

            for (let key of items.keys()) {
                setAmount(key, element.querySelector('[data-id=' + key + ']'), 0);
            }

            toggleClearButtonVisibility();
        }
    }


    function expandButtonClickHandler(event){
        event.preventDefault();
        if(element.classList.contains(dropdownExpandedClass)){
            element.classList.remove(dropdownExpandedClass);
            expandButton.classList.remove(expandButtonRotatedClass);
        }else{
            element.classList.add(dropdownExpandedClass);
            expandButton.classList.add(expandButtonRotatedClass);
        }
    }

    function descreaseButtonClickHandler(event) {
        event.preventDefault();
        let itemDOMElement = this.closest('.' + menuItemClass);
        let itemId = itemDOMElement.getAttribute('data-id');
        let item = items.get(itemId);
        if(items.get(itemId)['amount'] !== item['minAmount']){
            totalAmount = totalAmount - 1;
            setAmount(itemId, itemDOMElement, item['amount'] - 1);
            if(withButtons){
                toggleClearButtonVisibility();
            }
        }
    }

    function increaseButtonClickHandler(event) {
        event.preventDefault();
        let itemDOMElement = this.closest('.' + menuItemClass);
        let itemId = itemDOMElement.getAttribute('data-id');
        let item = items.get(itemId);
        if(items.get(itemId)['amount'] !== item['maxAmount']){
            totalAmount = +totalAmount + 1;
            setAmount(itemId, itemDOMElement, +item['amount'] + 1);
            if(withButtons){
                toggleClearButtonVisibility();
            }
        }
    }



    // Проверяет кнопки элемента и делает их полупрозрачными, если текущее значение является граничным
    function toggleDisabledButton(amount, minAmount, maxAmount, item) {
        let descreaseButton = item.querySelector('.' + descreaseButtonClass);
        let increaseButton = item.querySelector('.' + increaseButtonClass);
        if (amount === minAmount) {
            descreaseButton.classList.add(descreaseButtonDisabledClass);
        } else if (amount !== minAmount && descreaseButton.classList.contains(descreaseButtonDisabledClass)) {
            descreaseButton.classList.remove(descreaseButtonDisabledClass);
        }

        if (amount === maxAmount) {
            increaseButton.classList.add(increaseButtonDisabledClass);
        } else if (amount !== maxAmount && increaseButton.classList.contains(increaseButtonDisabledClass)) {
            increaseButton.classList.remove(increaseButtonDisabledClass);
        }
    }

    // Функция, которая считает общее кол-во элементов и вставляет строку с общим количеством в поле инпута
    function setSelectedTextByTotalAmount() {
        console.log(generalForms);
        // generalForms = generalForms.split(',');
        let result = '';
        if (totalAmount === 0) {
            result = placeholder;
        } else {
            result = totalAmount + ' ' + getProperWordForm(totalAmount, generalForms);
        }

        element.querySelector('.' + inputTextClass).innerText = result;
    }


    // Функция, которая генерирует строку с количеством каждого элемента отдельно и вставляет ее в поле инпута
    function setSelectedText() {
        let result = '';
        let flag = false;
        for (let item of items.keys()) {
            if (result !== '' && items.get(item)['amount'] !== 0) {
                result += ', ';
            }

            if (items.get(item)['amount'] === 0) {
                flag = true;
            } else {
                let forms = items.get(item)['forms'];
                result += items.get(item)['amount'] + ' ' + getProperWordForm(items.get(item)['amount'], forms);
            }
        }

        if (flag === true && totalAmount > 0) {
            result += '...';
        }
        if (totalAmount === 0) {
            result = placeholder;
        }

        element.querySelector('.' + inputTextClass).innerText = result;
    }

    // Функция, которая по количеству объектов, возвращает нужное слово из массива, т.е. в нужном падеже
    function getProperWordForm(number, forms) {
        let result = '';
        number = number % 100;
        if (number >= 11 && number <= 19) {
            result = forms[2];
        } else {
            number = number % 10;
            switch (number) {
                case(1):
                    result = forms[0];
                    break;
                case(2):
                case(3):
                case(4):
                    result = forms[1];
                    break;
                default:
                    result = forms[2];
            }
        }

        return result;
    }


    //Изменяет текущее кол-во элемента на новую
    function setAmount(itemId, item, amount) {
        items.get(itemId)['amount'] = amount;
        item.querySelector('.' + amountClass).innerText = items.get(itemId)['amount'];
        currentSetInputTextFunction();
        toggleDisabledButton(+items.get(itemId)['amount'],
            +items.get(itemId)['minAmount'], +items.get(itemId)['maxAmount'], item);
    }

    // Если кол-во выбранных элементов == 0, то кнопка Очистить должна быть скрытой
    function toggleClearButtonVisibility() {
        let clearButton = element.querySelector('.' + clearButtonClass);
        if (clearButton.classList.contains('dropdown__clear-button_hidden') && totalAmount !== 0) {
            clearButton.classList.remove('dropdown__clear-button_hidden');
        } else if (!clearButton.classList.contains('dropdown__clear-button_hidden') && totalAmount === 0) {
            clearButton.classList.add('dropdown__clear-button_hidden');
        }
    }

}

export default createDropdown;