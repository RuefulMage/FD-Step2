function hangUpListenerToLikeButton(likeButton) {
  const coloredLikeButtonClass = 'like-button_colored';
  likeButton.addEventListener('click', handleLikeButtonClick);

  function handleLikeButtonClick() {
    const icon = this.firstChild.firstChild;
    const likeAmount = this.firstChild.lastChild;
    if (this.classList.contains(coloredLikeButtonClass)) {
      this.classList.remove(coloredLikeButtonClass);
      icon.textContent = 'favorite_border';
      likeAmount.textContent = +likeAmount.textContent - 1;
    } else {
      this.classList.add(coloredLikeButtonClass);
      icon.textContent = 'favorite';
      likeAmount.textContent = +likeAmount.textContent + 1;
    }
  }
}

export default hangUpListenerToLikeButton;
