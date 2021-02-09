function createBurgerMenu(element) {
  const shownNavModifier = 'header__navigation_shown';
  const shownAuthModifier = 'header__auth_shown';
  const navClassName = 'js-header__navigation';
  const authClassName = 'js-header__auth';
  const burgerClassName = 'js-header__burger';
  const navElement = element.querySelector(`.${navClassName}`);
  const authElement = element.querySelector(`.${authClassName}`);
  const burgerElement = element.querySelector(`.${burgerClassName}`);
  burgerElement.addEventListener('click', handleClick);

  function handleClick() {
    navElement.classList.toggle(shownNavModifier);
    authElement.classList.toggle(shownAuthModifier);
    let burgerChild;
    for (let i = 0; i < burgerElement.children.length; i += 1) {
      burgerChild = burgerElement.children[i];
      burgerChild.classList.toggle('header__burger-element_active');
    }
  }
}

export default createBurgerMenu;
