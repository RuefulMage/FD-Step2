class LikeButton{
  static coloredLikeButtonClass = 'like-button_colored';

  constructor(likeButton) {
    this.likeButton = likeButton;
    likeButton.addEventListener('click', this.handleLikeButtonClick);
  }

  handleLikeButtonClick = () => {
    const icon = this.likeButton.firstChild.firstChild;
    const likeAmount = this.likeButton.firstChild.lastChild;
    if (this.likeButton.classList.contains(LikeButton.coloredLikeButtonClass)) {
      this.likeButton.classList.remove(LikeButton.coloredLikeButtonClass);
      icon.textContent = 'favorite_border';
      likeAmount.textContent = +likeAmount.textContent - 1;
    } else {
      this.likeButton.classList.add(LikeButton.coloredLikeButtonClass);
      icon.textContent = 'favorite';
      likeAmount.textContent = +likeAmount.textContent + 1;
    }
  }
}
export default LikeButton;
