//TODO сделать получание иконки через класс
//TODO сделать проверку на число(вдруг ввели как число лайков не число)

let likeButton = document.getElementsByClassName("like-button");
let i;

for(i = 0; i < likeButton.length; i++){
    likeButton[i].addEventListener("click", function () {
        let icon = this.firstChild.firstChild;
        let likeAmount = this.firstChild.lastChild;
        if(this.classList.contains("like-button_colored")){
            this.classList.remove("like-button_colored")
            icon.textContent = "favorite_border";
            likeAmount.textContent = +likeAmount.textContent - 1;
        }else{
            this.classList.add("like-button_colored");
            icon.textContent = "favorite";
            likeAmount.textContent = +likeAmount.textContent + 1;
        }
    })
}
