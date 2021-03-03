import Pagination from './Pagination';

const paginationList = document.getElementsByClassName('js-pagination');
for (let i = 0; i < paginationList.length; i += 1) {
  new Pagination(paginationList[i]);
}
