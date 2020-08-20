import 'air-datepicker';


function createCalendar(node){
    const calendarClass = 'js-calendar';
    const clearButtonClass = 'date-dropdown__calendar-clear-button';
    const appendButtonClass = 'date-dropdown__calendar-append-button';
    const buttonsWrapperClass = 'date-dropdown__calendar-buttons-wrapper';

    let dateDropdownInputs = node.querySelectorAll('.' + calendarClass);

    //иинициализация плагина
    let calendar = $(dateDropdownInputs[0]).datepicker({
        multipleDatesSeparator: ' - ',
        range: true,
        prevHtml: '<div class="date-dropdown__calendar-arrow">arrow_back</div>',
        nextHtml: '<div class="date-dropdown__calendar-arrow">arrow_forward</div>',
        onSelect: function(_, date){
            this.dates = date;
            clearInputs();
        },
        navTitles: {
            days: 'MM yyyy'
        }
    });


    let calendarData = calendar.data('datepicker');

    // Навешивание на инпут обработчик события click
    if(dateDropdownInputs.length === 2){
        dateDropdownInputs[1].addEventListener('click', showCalendar);
    }

    // Создание кнопок применить и очистить и навешивание на них обработчиков событий
    createCalendarButtonsBlock('очистить',
        'применить', calendarData, dateDropdownInputs);




    // Ф-я, показывающая календарь
    function showCalendar(){
        calendarData.show();
    }

    // Функция, очищающая все инпуты, привязанные к календарю
    function clearInputs(){
        for(let i = 0; i < dateDropdownInputs.length; i++){
            dateDropdownInputs[i].value = '';
        }
    }


    // Функция, создающая DOM-элементы кнопок и добавляющая их в документ
    function createCalendarButtonsBlock(clearButtonName, appendButtonName){
        let clearButton = document.createElement('button');
        clearButton.innerText = clearButtonName;
        clearButton.classList.add(clearButtonClass);

        let appendButton = document.createElement('button');
        appendButton.innerText = appendButtonName;
        appendButton.classList.add(appendButtonClass);

        addButtonsHandlers(clearButton, appendButton, calendarData,
            dateDropdownInputs);

        let calendarButtonsBlock = document.createElement('div');
        calendarButtonsBlock.classList.add(buttonsWrapperClass);
        calendarButtonsBlock.append(clearButton);
        calendarButtonsBlock.append(appendButton);

        let calendarDomElement = calendarData.$datepicker;
        calendarDomElement.append(calendarButtonsBlock);
    }


    let mounthsNames = new Map([
        [ 0, 'янв'],[ 1, 'фев'],
        [ 2, 'мар'],[ 3, 'апр'],
        [ 4, 'май'],[ 5, 'июн'],
        [ 6, 'июл'],[ 7, 'авг'],
        [ 8, 'сен'],[ 9, 'окт'],
        [ 10, 'ноб'],[ 11, 'дек']
    ]);

    // Функция, навешивающая обработчики событий на кнопки очистить и применить
    function addButtonsHandlers(clearButton, appendButton,
                                calendarData, dateDropdownInputs){
        clearButton.addEventListener('click', function () {
            calendarData.clear();
        });


        appendButton.addEventListener('click', function () {
            calendarData.hide();
            if(dateDropdownInputs.length == 1){
                dateDropdownInputs[0].value = calendarData.selectedDates[0].getDate() + ' '
                    + mounthsNames.get(calendarData.selectedDates[0].getMonth()) + ' - '
                    + calendarData.selectedDates[1].getDate() + ' '
                    + mounthsNames.get(calendarData.selectedDates[1].getMonth())
            } else {
                dateDropdownInputs[0].value= calendarData.selectedDates[0].toLocaleDateString();
                dateDropdownInputs[1].value= calendarData.selectedDates[1].toLocaleDateString();
            }
        });
    }

}

export default createCalendar;