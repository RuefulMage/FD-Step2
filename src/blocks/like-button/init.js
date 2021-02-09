import hangUpListenerToLikeButton from './like-button';

const likeButtons = document.getElementsByClassName('js-like-button');
for (let i = 0; i < likeButtons.length; i += 1) {
  hangUpListenerToLikeButton(likeButtons[i]);
}
