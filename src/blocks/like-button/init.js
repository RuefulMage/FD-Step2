import LikeButton from './LikeButton';

const likeButtons = document.getElementsByClassName('js-like-button');
for (let i = 0; i < likeButtons.length; i += 1) {
  new LikeButton(likeButtons[i]);
}
