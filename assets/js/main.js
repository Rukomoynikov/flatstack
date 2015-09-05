// Fixing navigation menu
var navigationPanel = document.querySelector("nav");

document.addEventListener('scroll', listener)

function listener (){
	if (window.pageYOffset > 24) {
		navigationPanel.classList.add("header__nav--fixed")
	} else {
		navigationPanel.classList.remove("header__nav--fixed")
	}
}