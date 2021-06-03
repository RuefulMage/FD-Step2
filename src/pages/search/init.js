import FilterForm from './FilterForm';

const buttonsList = document.getElementsByClassName('js-search__show-filter-button');
Array.from(buttonsList).forEach(button => {
  new FilterForm(button);
});
