function createDropdown(element, setSelectionTextFunction, withButtons) {
    let expandButton = element.querySelector('.dropdown__expand-button');

    expandButton.addEventListener('click', function () {
        if(element.classList.contains('dropdown_expanded')){
            element.classList.remove('dropdown_expanded');
            expandButton.classList.remove("dropdown__expand-button_rotated")
        }else{
            element.classList.add('dropdown_expanded');
            expandButton.classList.add("dropdown__expand-button_rotated");
        }
    });
    let generalForms = element.getAttribute('data-forms');
    let placeholder = element.getAttribute('data-placeholder');

    let itemsArray = element.querySelectorAll('.js-dropdown-menu-item');

    let items = new Map;
    let totalAmount = 0;


    itemsArray.forEach(item => {
        let itemId = item.getAttribute('data-id');
        items.set(
            itemId,
            {
                "forms": item.getAttribute('data-forms'),
                "minAmount": item.getAttribute('data-min-amount'),
                "maxAmount": item.getAttribute('data-max-amount'),
                "amount": item.querySelector('.dropdown__amount').innerText,
            });
        let currentItem = items.get(itemId);
        totalAmount = totalAmount + +currentItem['amount'];
        toggleDisabledButton(currentItem['amount'], currentItem['minAmount'], currentItem['maxAmount'], item);
    });
    if(withButtons){
        if(withButtons){
            toggleClearButtonVisibility(element, totalAmount);
        }
    }

    setSelectionTextFunction(element, items, totalAmount, placeholder, generalForms );
    itemsArray.forEach(item => {
        let itemId = item.getAttribute('data-id');
        let descreaseButton = item.querySelector('.js-dropdown-descrease');
        descreaseButton.addEventListener('click', function () {
            if(items.get(itemId)['amount'] != items.get(itemId)['minAmount']){
                totalAmount = totalAmount - 1;
                setAmount(element, itemId, item, items, items.get(itemId)['amount'] - 1, totalAmount, setSelectionTextFunction, placeholder, generalForms);
                if(withButtons){
                    toggleClearButtonVisibility(element, totalAmount);
                }
            }
        });

        let increaseButton = item.querySelector('.js-dropdown-increase');
        increaseButton.addEventListener('click', function () {
            if(items.get(itemId)['amount'] != items.get(itemId)['maxAmount']){
                totalAmount = +totalAmount + 1;
                setAmount(element, itemId, item, items, +items.get(itemId)['amount'] + 1, totalAmount, setSelectionTextFunction, placeholder, generalForms);
                if(withButtons){
                    toggleClearButtonVisibility(element, totalAmount);
                }
            }
        })
    });


    if(withButtons) {
        let clearButton = element.querySelector('.js-dropdown-clear-button');
        clearButton.addEventListener('click', function () {
            if (totalAmount > 0) {
                totalAmount = 0;

                for (let key of items.keys()) {
                    setAmount(element, key, element.querySelector('[data-id=' + key + ']'),
                        items, 0, totalAmount, setSelectionTextFunction, placeholder, generalForms);
                }

                toggleClearButtonVisibility(element, totalAmount);
            }
        });

        let applyButton = element.querySelector('.js-append-button');
        applyButton.addEventListener('click', function () {
            if (element.classList.contains('dropdown_expanded')) {
                element.classList.remove('dropdown_expanded');
                expandButton.classList.remove("dropdown__expand-button_rotated")
            } else {
                element.classList.add('dropdown_expanded');
                expandButton.classList.add("dropdown__expand-button_rotated");
            }
        });
    }
}

function setSelectedTextByTotalAmount(element, items, totalAmount, placeholder, forms){
    forms = forms.split(',');
    let result = '';
    if(totalAmount == 0){
        result = placeholder;
    } else {
        result = totalAmount + ' ' + getProperWordForm(totalAmount, forms);
    }

    element.querySelector('.dropdown__text').innerText = result;
}



function setAmount(element, itemId, item, items, amount, totalAmount, setSelectionTextFunction, placeholder, forms) {
    items.get(itemId)['amount'] = amount;
    item.querySelector('.dropdown__amount').innerText = items.get(itemId)['amount'];
    setSelectionTextFunction(element, items, totalAmount, placeholder, forms);
    toggleDisabledButton(items.get(itemId)['amount'],
        items.get(itemId)['minAmount'], items.get(itemId)['maxAmount'], item);
}


function toggleDisabledButton(amount, minAmount, maxAmount, item) {
    let descreaseButton = item.querySelector('.js-dropdown-descrease');
    let increaseButton = item.querySelector('.js-dropdown-increase');
    if(amount == minAmount && !descreaseButton.classList.contains('dropdown__descrease_disabled')){
        descreaseButton.classList.add('dropdown__descrease_disabled');
    }
    else if(amount != minAmount && descreaseButton.classList.contains('dropdown__descrease_disabled')){
        descreaseButton.classList.remove('dropdown__descrease_disabled');
    }

    if(amount == maxAmount && !increaseButton.classList.contains('dropdown__increase_disabled')){
        increaseButton.classList.add('dropdown__increase_disabled');
    }
    else if(amount != maxAmount && increaseButton.classList.contains('dropdown__increase_disabled')){
        increaseButton.classList.remove('dropdown__increase_disabled');
    }
}

function setSelectedText(element, items, totalAmount, placeholder) {
    let result = '';
    let flag = false;
    for (let item of items.keys()) {
        if (result !== '' && items.get(item)['amount'] != 0) {
            result += ', ';
        }

        if (items.get(item)['amount'] == 0) {
            flag = true;
        } else {
            let forms = items.get(item)['forms'].split(",");
            result += items.get(item)['amount'] + ' ' + getProperWordForm(items.get(item)['amount'], forms);
        }
    }

    if (flag === true && totalAmount > 0) {
        result += '...';
    }
    if (totalAmount == 0){
        result = placeholder;
    }

    element.querySelector('.dropdown__text').innerText = result;
}

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


function toggleClearButtonVisibility(element, totalAmount){
    let clearButton = element.querySelector('.js-dropdown-clear-button')
    if(clearButton.classList.contains('dropdown__clear-button_hidden') && totalAmount != 0){
        clearButton.classList.remove('dropdown__clear-button_hidden');
    }
    else if(!clearButton.classList.contains('dropdown__clear-button_hidden') && totalAmount == 0){
        clearButton.classList.add('dropdown__clear-button_hidden');
    }
}













let dropdownsWithButtonsList = document.getElementsByClassName('js-dropdown-with-buttons');
for( let i = 0; i < dropdownsWithButtonsList.length; i++) {
    createDropdown(dropdownsWithButtonsList[i], setSelectedTextByTotalAmount, true);
}

let dropdownsList = document.getElementsByClassName('js-dropdown');
for( let i = 0; i < dropdownsList.length; i++) {
    createDropdown(dropdownsList[i], setSelectedText, false);
}