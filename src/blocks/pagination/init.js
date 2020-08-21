import hangUpListenerToPagination from './pagination';

let paginationList = document.getElementsByClassName('js-pagination');

for (let i = 0; i < paginationList.length; i++) {
    hangUpListenerToPagination(paginationList[i]);
}