import 'air-datepicker';

function createCalendar(node) {
  const defaultInputString = 'ДД.ММ.ГГГГ';
  const defaultSingleInputString = 'дд месяц';
  const calendarClass = 'js-calendar';
  const clearButtonClass = 'date-dropdown__calendar-clear-button';
  const appendButtonClass = 'date-dropdown__calendar-append-button';
  const buttonsWrapperClass = 'date-dropdown__calendar-buttons-wrapper';

  const dateDropdownInputs = node.querySelectorAll(`.${calendarClass}`);

  // инициализация плагина
  const calendarData = $(dateDropdownInputs[0]).datepicker({
    multipleDatesSeparator: 'defaultSingleInputString - ',
    range: true,
    prevHtml: '<div class="date-dropdown__calendar-arrow">arrow_back</div>',
    nextHtml: '<div class="date-dropdown__calendar-arrow">arrow_forward</div>',
    onSelect(_, date) {
      this.dates = date;
      clearInputs();
    },
    onHide() {
      setInputsValues();
    },
    navTitles: {
      days: 'MM yyyy',
    },
  }).data('datepicker');

  // Навешивание на инпут обработчик события click
  if (dateDropdownInputs.length === 2) {
    dateDropdownInputs[1].addEventListener('click', showCalendar);
  }

  // Создание кнопок применить и очистить и навешивание на них обработчиков событий
  createCalendarButtonsBlock('очистить',
    'применить', calendarData, dateDropdownInputs);

  // Ф-я, показывающая календарь
  function showCalendar() {
    calendarData.show();
  }

  // Функция, очищающая все инпуты, привязанные к календарю
  function clearInputs() {
    for (let i = 0; i < dateDropdownInputs.length; i += 1) {
      dateDropdownInputs[i].value = '';
    }
  }

  // Функция, создающая DOM-элементы кнопок и добавляющая их в документ
  function createCalendarButtonsBlock(clearButtonName, appendButtonName) {
    const clearButton = document.createElement('button');
    clearButton.innerText = clearButtonName;
    clearButton.classList.add(clearButtonClass);

    const appendButton = document.createElement('button');
    appendButton.innerText = appendButtonName;
    appendButton.classList.add(appendButtonClass);

    addButtonsHandlers(clearButton, appendButton, calendarData,
      dateDropdownInputs);

    const calendarButtonsBlock = document.createElement('div');
    calendarButtonsBlock.classList.add(buttonsWrapperClass);
    calendarButtonsBlock.append(clearButton);
    calendarButtonsBlock.append(appendButton);

    const calendarDomElement = calendarData.$datepicker;
    calendarDomElement.append(calendarButtonsBlock);
  }

  const monthsNames = new Map([
    [0, 'янв'], [1, 'фев'],
    [2, 'мар'], [3, 'апр'],
    [4, 'май'], [5, 'июн'],
    [6, 'июл'], [7, 'авг'],
    [8, 'сен'], [9, 'окт'],
    [10, 'ноб'], [11, 'дек'],
  ]);

  // Функция, навешивающая обработчики событий на кнопки очистить и применить
  function addButtonsHandlers(clearButton, appendButton) {
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
    if (dateDropdownInputs.length === 1) {
      let startDate = calendarData.selectedDates[0];
      const isStartDateDefined = (startDate !== null && startDate !== undefined);
      if (isStartDateDefined) {
        startDate = `${startDate.getDate()} ${
          monthsNames.get(startDate.getMonth())}`;
      } else {
        startDate = defaultSingleInputString;
      }

      let endDate = calendarData.selectedDates[1];
      const isEndDateDefined = (endDate !== null && endDate !== undefined);
      if (isEndDateDefined) {
        endDate = `${endDate.getDate()} ${
          monthsNames.get(endDate.getMonth())}`;
      } else {
        endDate = defaultSingleInputString;
      }
      dateDropdownInputs[0].value = `${startDate} - ${endDate}`;
    } else {
      dateDropdownInputs.forEach((input, index) => {
        const date = calendarData.selectedDates[index];
        const isDateDefined = (date !== null && date !== undefined);

        if (isDateDefined) {
          // eslint-disable-next-line no-param-reassign
          input.value = date.toLocaleDateString();
        } else {
          // eslint-disable-next-line no-param-reassign
          input.value = defaultInputString;
        }
      });
    }
  }

  // Извлекаем из HTML стартовый интервал и задаем его календарю
  let startDateInterval = node.getAttribute('data-start-interval');
  const isStartIntervalDefined = (startDateInterval !== null && startDateInterval !== undefined);

  if (isStartIntervalDefined) {
    startDateInterval = startDateInterval.split(',');

    startDateInterval.forEach((item) => {
      const date = new Date(item);
      const isDateDefined = (date !== null && date !== undefined);
      if (isDateDefined) {
        calendarData.selectDate(date);
      }
    });
  }

  setInputsValues();
}

export default createCalendar;
