import hangUpListenerToPagination from './pagination';

const paginationList = document.getElementsByClassName('js-pagination');

for (let i = 0; i < paginationList.length; i += 1) {
  hangUpListenerToPagination(paginationList[i]);
}
