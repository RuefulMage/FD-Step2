class BurgerMenu {
  static shownNavModifier = 'header__navigation_shown';

  static shownAuthModifier = 'header__auth_shown';

  static navClassName = 'js-header__navigation';

  static authClassName = 'js-header__auth';

  static burgerClassName = 'js-header__burger';

  constructor(element) {
    this.navElement = element.querySelector(`.${BurgerMenu.navClassName}`);
    this.authElement = element.querySelector(`.${BurgerMenu.authClassName}`);
    this.burgerElement = element.querySelector(`.${BurgerMenu.burgerClassName}`);
    this.burgerElement.addEventListener('click', this.handleBurgerButtonClick);
  }

  handleBurgerButtonClick = () => {
    this.navElement.classList.toggle(BurgerMenu.shownNavModifier);
    this.authElement.classList.toggle(BurgerMenu.shownAuthModifier);
    let burgerChild;
    for (let i = 0; i < this.burgerElement.children.length; i += 1) {
      burgerChild = this.burgerElement.children[i];
      burgerChild.classList.toggle('header__burger-element_active');
    }
  }
}

export default BurgerMenu;
