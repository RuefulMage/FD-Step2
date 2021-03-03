import BurgerMenu from './BurgerMenu';

const burgers = document.querySelectorAll('.js-header');
for (let i = 0; i < burgers.length; i += 1) {
  new BurgerMenu(burgers[i]);
}
