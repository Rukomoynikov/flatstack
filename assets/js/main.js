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

// Make radial diagrams
var diagrams = document.querySelectorAll('.oneSkill');
Object.prototype.forEach = Array.prototype.forEach;

diagrams.forEach(function(el){
	var svg = el.childNodes[0];
	var percent = parseInt(el.childNodes[1].innerText);
	var bar = el.childNodes[0].childNodes[3];
	var bar_background = el.childNodes[0].childNodes[1];
	var radius = svg.height.baseVal.value / 2;
	el.circleLength = (Math.PI *  radius ) * 2;
	var bar_offset = "-" + ((100 - percent) / 100 ) * el.circleLength;;
	bar.style.strokeDasharray = bar_background.style.strokeDasharray = el.circleLength;
	bar.style.strokeDashoffset = bar_offset;
	
	// Хак, для того чтобы начало бара было там где должно быть, иначе начинается справа на отметке 90%.
	var required_rotate = 275 + Number(bar_offset);
	svg.style.transform = "rotateZ(" + required_rotate + "deg)";
})

// Form validation
var form = document.querySelector('form');
form.addEventListener('submit');
