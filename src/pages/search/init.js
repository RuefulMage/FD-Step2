import ShowFormButton from "./ShowFormButton";

const buttonsList = document.getElementsByClassName('js-search__show-filter-button');
for (let i = 0; i < buttonsList.length; i += 1) {
  new ShowFormButton(buttonsList[i]);
}
