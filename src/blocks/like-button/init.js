import hangUpListenerToLikeButton from './like-button';

let likeButtons = document.getElementsByClassName('js-like-button');

for (let i = 0; i < likeButtons.length; i++) {
    hangUpListenerToLikeButton(likeButtons[i]);
}