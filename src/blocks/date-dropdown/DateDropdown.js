import 'air-datepicker';

class DateDropdown {
  static defaultInputString = 'ДД.ММ.ГГГГ';
  static defaultSingleInputString = 'дд месяц';
  static clearButtonClass = 'date-dropdown__calendar-clear-button';
  static appendButtonClass = 'date-dropdown__calendar-append-button';
  static buttonsWrapperClass = 'date-dropdown__calendar-buttons-wrapper';
  static showButtonClass = 'date-dropdown__expand-button';
  static showButtonHiddenModifier = 'date-dropdown__expand-button_hidden';
  static monthsNames = new Map([
    [0, 'янв'], [1, 'фев'],
    [2, 'мар'], [3, 'апр'],
    [4, 'май'], [5, 'июн'],
    [6, 'июл'], [7, 'авг'],
    [8, 'сен'], [9, 'окт'],
    [10, 'ноб'], [11, 'дек'],
  ]);

  options = {
    multipleDatesSeparator: ' - ',
    range: true,
    prevHtml: '<div class="date-dropdown__calendar-arrow">arrow_back</div>',
    nextHtml: '<div class="date-dropdown__calendar-arrow">arrow_forward</div>',
    onSelect: (_, date) => {
      this.dates = date;
      this.clearInputs();
    },
    onShow: (_, animationCompleted) => {
      this.handleCalendarShow(animationCompleted);
    },
    onHide: (_, animationCompleted) => {
      this.handleCalendarHide(animationCompleted);
    },
    navTitles: {
      days: 'MM yyyy',
    },
  };

  constructor(node, calendarClass) {
    this.dateDropdownInputs = node.querySelectorAll(`.${calendarClass}`);
    this.node = node;
    this.init();
  }

  init() {
    this.calendarData = $(this.dateDropdownInputs[0]).datepicker(this.options).data('datepicker');
    this.dateDropdownInputs.forEach((input) => input.addEventListener('click', this.handleShowCalendarButtonClick));
    this.isHide = true;
    this.createCalendarButtonsBlock('очистить',
      'применить', this.calendarData, this.dateDropdownInputs);
    let startDateInterval = this.node.getAttribute('data-start-interval');
    const isStartIntervalDefined = (startDateInterval !== null && startDateInterval !== undefined);
    if (isStartIntervalDefined) {
      startDateInterval = startDateInterval.split(',');
      startDateInterval.forEach((item) => {
        const date = new Date(item);
        const isDateDefined = (date !== null && date !== undefined);
        if (isDateDefined) {
          this.calendarData.selectDate(date);
        }
      });
    }
    this.setInputsValues();
  }

  handleShowCalendarButtonClick = () => {
    if (this.isHide) {
      this.calendarData.show();
    } else {
      this.calendarData.hide();
    }
  }

  handleCalendarHide = (animationCompleted) => {
    if (!this.isHide && animationCompleted) {
      this.setInputsValues();
      this.toggleShowButton();
      this.isHide = true;
    }
  }

  handleCalendarShow = (animationCompleted) => {
    if (this.isHide && animationCompleted) {
      this.toggleShowButton();
      this.isHide = false;
    }
  }

  toggleShowButton() {
    this.dateDropdownInputs.forEach((input) => {
      const { parentElement } = input;
      const buttonElement = parentElement.querySelector(`.${DateDropdown.showButtonClass}`);
      buttonElement.classList.toggle(DateDropdown.showButtonHiddenModifier);
    });
  }

  clearInputs = () => {
    this.dateDropdownInputs.forEach(input => input.value = '');
  }

  createCalendarButtonsBlock(clearButtonName, appendButtonName) {
    const clearButton = document.createElement('button');
    clearButton.innerText = clearButtonName;
    clearButton.classList.add(DateDropdown.clearButtonClass);
    const appendButton = document.createElement('button');
    appendButton.innerText = appendButtonName;
    appendButton.classList.add(DateDropdown.appendButtonClass);
    this.addButtonsHandlers(clearButton, appendButton, this.calendarData,
      this.dateDropdownInputs);
    const calendarButtonsBlock = document.createElement('div');
    calendarButtonsBlock.classList.add(DateDropdown.buttonsWrapperClass);
    calendarButtonsBlock.append(clearButton);
    calendarButtonsBlock.append(appendButton);
    const calendarDomElement = this.calendarData.$datepicker;
    calendarDomElement.append(calendarButtonsBlock);
  }

  addButtonsHandlers(clearButton, appendButton) {
    clearButton.addEventListener('click', this.handleClearButtonClick);
    appendButton.addEventListener('click', this.handleAppendButtonClick);
  }

  handleClearButtonClick = () => {
    this.calendarData.clear();
    this.setInputsValues();
  }

  handleAppendButtonClick = () => {
    this.calendarData.hide();
    this.setInputsValues();
  }

  setInputsValues = () => {
    if (this.dateDropdownInputs.length === 1) {
      let startDate = this.calendarData.selectedDates[0];
      const isStartDateDefined = (startDate !== null && startDate !== undefined);
      if (isStartDateDefined) {
        startDate = `${startDate.getDate()} ${
          DateDropdown.monthsNames.get(startDate.getMonth())}`;
      } else {
        startDate = DateDropdown.defaultSingleInputString;
      }
      let endDate = this.calendarData.selectedDates[1];
      const isEndDateDefined = (endDate !== null && endDate !== undefined);
      if (isEndDateDefined) {
        endDate = `${endDate.getDate()} ${
          DateDropdown.monthsNames.get(endDate.getMonth())}`;
      } else {
        endDate = DateDropdown.defaultSingleInputString;
      }
      this.dateDropdownInputs[0].value = `${startDate} - ${endDate}`;
    } else {
      this.dateDropdownInputs.forEach((input, index) => {
        const date = this.calendarData.selectedDates[index];
        const isDateDefined = (date !== null && date !== undefined);

        if (isDateDefined) {
          // eslint-disable-next-line no-param-reassign
          input.value = date.toLocaleDateString();
        } else {
          // eslint-disable-next-line no-param-reassign
          input.value = DateDropdown.defaultInputString;
        }
      });
    }
  }
}

export default DateDropdown;
