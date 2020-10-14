import createBurgerMenu from './header';

const burgers = document.querySelectorAll('.js-header');

for (let i = 0; i < burgers.length; i += 1) {
  createBurgerMenu(burgers[i]);
}
