import LikeButton from './LikeButton';

const likeButtons = document.getElementsByClassName('js-like-button');
Array.from(likeButtons).forEach(button => {
  new LikeButton(button);
});