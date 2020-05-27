import 'air-datepicker';



function createCalendar(node){
    let calendarBlock = document.getElementsByClassName('calendar')[0];
    let dateDropdownInputs = [];
    for( let i = 0; i < node.children.length; i++){
        if (node.children[i].classList.contains('js-calendar')){
            dateDropdownInputs.push(node.children[i]);
        }
    }

    let calendar = $(dateDropdownInputs[0]).datepicker({
        // minDate: new Date(),
        multipleDatesSeparator: " - ",
        range: true,
        prevHtml: "<div class='calendar__arrow'>arrow_back</div>",
        nextHtml: "<div class='calendar__arrow'>arrow_forward</div>",
        onSelect: function(_, date){
            this.dates = date;
            clearInputs(dateDropdownInputs);
        },
        navTitles: {
            days: 'MM yyyy'
        }
    });


    let calendarData = calendar.data('datepicker');

    if(dateDropdownInputs.length == 2){
        dateDropdownInputs[1].addEventListener('click', showCalendar.bind(null, calendarData));
    }
    createCalendarButtonsBlock("очистить",
        "подтвердить", calendarData, dateDropdownInputs);
}

function showCalendar(calendarData){
    calendarData.show();
}

function clearInputs(dateDropdownInputs){
    for(let i = 0; i < dateDropdownInputs.length; i++){
        dateDropdownInputs[i].value = '';
    }
}

function createCalendarButtonsBlock(clearButtonName, appendButtonName,
                                    calendarData, dateDropdownInputs){
    let clearButton = document.createElement('button');
    clearButton.innerText = clearButtonName;
    clearButton.classList.add("calendar__clear-button");

    let appendButton = document.createElement('button');
    appendButton.innerText = appendButtonName;
    appendButton.classList.add("calendar__append-button");
    
    addButtonsHandlers(clearButton, appendButton, calendarData,
        dateDropdownInputs);

    let calendarButtonsBlock = document.createElement('div');
    calendarButtonsBlock.classList.add("calendar__buttons-wrapper");
    calendarButtonsBlock.append(clearButton);
    calendarButtonsBlock.append(appendButton);

    let calendarDomElement = calendarData.$datepicker;
    calendarDomElement.append(calendarButtonsBlock);
}

function addButtonsHandlers(clearButton, appendButton,
                            calendarData, dateDropdownInputs){
    clearButton.addEventListener('click', function () {
        calendarData.clear();
    });


    appendButton.addEventListener('click', function () {
        calendarData.hide();
        if(dateDropdownInputs.length == 1){
            dateDropdownInputs[0].value= calendarData.selectedDates[0].toLocaleDateString()
                + " - " + calendarData.selectedDates[1].toLocaleDateString();
        } else {
            dateDropdownInputs[0].value= calendarData.selectedDates[0].toLocaleDateString();
            dateDropdownInputs[1].value= calendarData.selectedDates[1].toLocaleDateString();
        }
    })
}
