class Header {
  static shownNavModifier = 'header__navigation_shown';

  static shownAuthModifier = 'header__auth_shown';

  static navClassName = 'js-header__navigation';

  static authClassName = 'js-header__auth-info';

  static burgerButtonClassName = 'js-header__burger-button';

  static burgerButtonActiveModifier = 'header__burger-button_active';

  constructor(element) {
    this.element = element;
    this.init();
  }

  init = () => {
    this.navigation = this.element.querySelector(`.${Header.navClassName}`);
    this.authInfo = this.element.querySelector(`.${Header.authClassName}`);
    this.burgerButton = this.element.querySelector(`.${Header.burgerButtonClassName}`);
    this.addHandler();
  }

  addHandler = () => {
    this.burgerButton.addEventListener('click', this.handleBurgerButtonClick);
  }

  handleBurgerButtonClick = () => {
    this.navigation.classList.toggle(Header.shownNavModifier);
    this.authInfo.classList.toggle(Header.shownAuthModifier);
    this.burgerButton.classList.toggle(Header.burgerButtonActiveModifier);
  }
}

export default Header;
