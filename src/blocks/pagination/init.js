import hangUpListenerToPagination from './pagination';

let paginations = document.getElementsByClassName('js-pagination');

for (let i = 0; i < paginations.length; i++) {
    hangUpListenerToPagination(paginations[i]);
}