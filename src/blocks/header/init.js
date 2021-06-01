import Header from './Header';

const headers = document.querySelectorAll('.js-header');
headers.forEach(header => {
  new Header(header);
});
