import Pagination from './Pagination';

const paginationList = document.getElementsByClassName('js-pagination');
Array.from(paginationList).forEach((item) => {
  (() => new Pagination(item))();
});
