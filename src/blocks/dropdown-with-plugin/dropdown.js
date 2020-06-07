function creatDropdown(selector) {
    $(selector).iqDropdown({
        setSelectionText: (itemCount, totalItems) => {
            let result = '';
            let flag = false;
            for (let item in itemCount) {
                setDisabledFlag(item, itemCount[item]);
                if (result !== '' && itemCount[item] != 0) {
                    result += ', ';
                }

                if (itemCount[item] == 0) {
                    flag = true;
                } else {
                    let forms = $('[data-id=' + item + ']').attr('data-forms').split(",");
                    result += itemCount[item] + ' ' + getProperWordForm(itemCount[item], forms);
                }
            }

            if (flag === true) {
                result += '...';
            }
            return result;
        },
    });
}

// creatDropdown('.iqdropdown.js-dropdown-with-plugin-ds');
// creatDropdownWithButtons('.iqdropdown.js-dropdown-with-plugin-fg');
let elem = document.getElementsByClassName('js-dropdown-with-plugin-fg')[0];
creatDropdownWithButtons(elem);
// $(elem).iqDropdown(
//     {
//     setSelectionText: (itemCount, totalItems) => {
//         let result = 'bla bla';
//
//         return result;
//     }
// }
// );
// alert(elem);
// console.log(elem);

// creatDropdownWithButtons(elem);

function creatDropdownWithButtons(selector) {
    $(selector).iqDropdown({
        setSelectionText: (itemCount, totalItems) => {
            let result = 'bla bla';

            return result;
        }
    });

    // let dropdownDomElement = elem.querySelector('.iqdropdown-menu');
    // // let elemememememe = document.createElement('div');
    // // elemememememe.innerText = 'sdfsyserdcfmjinhubytfrcdeyxstwxdrcfkm k,/kjhbkcfdxszteawdetxfcvgmknhjvgftcyrxsetzwaqtsexdrcfgvnhjmklnhjfcdxsetzwxdcfvgnhjmklmnjhubygvitrfcedxsyctfvyguhnjimko,l;mknjhbvgf';
    //
    // dropdownDomElement.append(dropdownButtonsBlock);
}

function setDisabledFlag(itemId, itemValue) {
    let button = $('[data-id=' + itemId + '] .iqdropdown-item-controls .button-decrement')[0];
    if (itemValue !== 0 && button.classList.contains('dropdown__disabled')){
        button.classList.remove('dropdown__disabled');
    }

    if (itemValue === 0 && !button.classList.contains('dropdown__disabled')){
        button.classList.add('dropdown__disabled');
    }
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