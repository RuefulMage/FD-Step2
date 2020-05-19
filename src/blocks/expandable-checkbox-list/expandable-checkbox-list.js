let checkboxListButton = document.getElementsByClassName(
    "expandable-checkbox-list__button");

checkboxListButton[0].addEventListener("click", function () {
  this.classList
  let checkboxList = this.nextElementSibling;
  let icon = this.lastChild;
  if(checkboxList.style.display === "block"){
    checkboxList.style.display = "none";
    icon.classList.remove("expandable-checkbox-list__arrow_rotated");
  } else{
    checkboxList.style.display = "block";
    icon.classList.add("expandable-checkbox-list__arrow_rotated");
  }
})