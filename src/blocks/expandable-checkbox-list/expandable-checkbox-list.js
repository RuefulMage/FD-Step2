let checkboxListButton = document.getElementsByClassName("js-expandable-checkbox-list__button");
let i;

for (i = 0; i < checkboxListButton.length; i++) {
  checkboxListButton[i].addEventListener("click", function() {
    let checkboxList = this.nextElementSibling;
    let icon = this.lastChild;
    if (checkboxList.style.display === "block") {
      checkboxList.style.display = "none";
      icon.classList.remove("expandable-checkbox-list__arrow_rotated");
    } else {
      checkboxList.style.display = "block";
      icon.classList.add("expandable-checkbox-list__arrow_rotated");
    }
  });
}