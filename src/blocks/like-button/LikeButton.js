class LikeButton {
  static coloredLikeButtonClass = 'like-button_colored';

  constructor(likeButton) {
    this.likeButton = likeButton;
    this.addHandler();
  }

  addHandler = () => {
    this.likeButton.addEventListener('click', this.handleLikeButtonClick);
  }

  handleLikeButtonClick = () => {
    const icon = this.likeButton.firstChild.firstChild;
    const amount = this.likeButton.firstChild.lastChild;
    const isLiked = this.likeButton.classList.contains(LikeButton.coloredLikeButtonClass);
    if (isLiked) {
      this.likeButton.classList.remove(LikeButton.coloredLikeButtonClass);
      icon.textContent = 'favorite_border';
      amount.textContent = +amount.textContent - 1;
    } else {
      this.likeButton.classList.add(LikeButton.coloredLikeButtonClass);
      icon.textContent = 'favorite';
      amount.textContent = +amount.textContent + 1;
    }
  }
}

export default LikeButton;
