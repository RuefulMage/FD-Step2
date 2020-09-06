import 'air-datepicker';


function createCalendar(node){
    const defaultInputString = 'ДД.ММ.ГГГГ';
    const defaultSingleInputString = 'дд месяц';
    const calendarClass = 'js-calendar';
    const clearButtonClass = 'date-dropdown__calendar-clear-button';
    const appendButtonClass = 'date-dropdown__calendar-append-button';
    const buttonsWrapperClass = 'date-dropdown__calendar-buttons-wrapper';

    let dateDropdownInputs = node.querySelectorAll('.' + calendarClass);

    //инициализация плагина
    let calendar = $(dateDropdownInputs[0]).datepicker({
        multipleDatesSeparator: 'defaultSingleInputString - ',
        range: true,
        prevHtml: '<div class="date-dropdown__calendar-arrow">arrow_back</div>',
        nextHtml: '<div class="date-dropdown__calendar-arrow">arrow_forward</div>',
        onSelect: function(_, date) {
            this.dates = date;
            clearInputs();
        },
        onHide: function(calendar) {
            setInputsValues();
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


    let monthsNames = new Map([
        [ 0, 'янв'],[ 1, 'фев'],
        [ 2, 'мар'],[ 3, 'апр'],
        [ 4, 'май'],[ 5, 'июн'],
        [ 6, 'июл'],[ 7, 'авг'],
        [ 8, 'сен'],[ 9, 'окт'],
        [ 10, 'ноб'],[ 11, 'дек']
    ]);

    // Функция, навешивающая обработчики событий на кнопки очистить и применить
    function addButtonsHandlers(clearButton, appendButton){
        clearButton.addEventListener('click', handleClearButtonClick);
        appendButton.addEventListener('click', handleAppendButtonClick);
    }

    function handleClearButtonClick() {
        calendarData.clear();
        setInputsValues();
    }

    function handleAppendButtonClick() {
        calendarData.hide();
        setInputsValues();
    }

    // Изменяет содержимое инпутов на выбранные даты
    function setInputsValues() {
        if(dateDropdownInputs.length === 1){
            let startDate = calendarData.selectedDates[0];
            let isStartDateDefined = (startDate !== null && startDate !== undefined);
            if( isStartDateDefined ){
                startDate = startDate.getDate() + ' '
                    + monthsNames.get(startDate.getMonth());
            } else {
                startDate = defaultSingleInputString;
            }

            let endDate = calendarData.selectedDates[1];
            let isEndDateDefined = (endDate !== null && endDate !== undefined);
            if( isEndDateDefined ){
                endDate = endDate.getDate() + ' '
                    + monthsNames.get(endDate.getMonth());
            } else {
                endDate = defaultSingleInputString;
            }
            dateDropdownInputs[0].value = startDate + ' - ' + endDate;
        } else {
            dateDropdownInputs.forEach( (input, index) => {
                let date = calendarData.selectedDates[index];
                let isDateDefined = (date !== null && date !== undefined);

                if( isDateDefined ){
                    input.value = date.toLocaleDateString();
                } else {
                    input.value = defaultInputString;
                }
            });
        }
    }


    // Извлекаем из HTML стартовый интервал и задаем его календарю
    const startDateInterval = node.getAttribute('data-start-interval');
    let isStartIntervalDefined = (startDateInterval !== null && startDateInterval !== undefined);

    if( isStartIntervalDefined ){
        const startDateInterval = startDateInterval.split(',');

        startDateInterval.map(item => {
            let date = new Date(item);
            let isDateDefined = (date !== null && date !== undefined);
            if( isDateDefined){
                calendarData.selectDate(item);
            }
        });
    }

    setInputsValues();


}

export default createCalendar;