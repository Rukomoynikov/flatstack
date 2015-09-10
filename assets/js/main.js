'use strict';

// Fixing navigation menu
var navigationPanel = document.querySelector("nav");

document.addEventListener('scroll', listener)

function listener (){
	if (window.pageYOffset > 24) {
		navigationPanel.classList.add("nav--fixed")
	} else {
		navigationPanel.classList.remove("nav--fixed")
	}

	if (menu.classList.length > 2) {
		menu.classList.remove('menu--visible')
	}
}

// Make radial diagrams
var diagrams = document.querySelectorAll('.oneSkill');
Object.prototype.forEach = Array.prototype.forEach;
Object.prototype.filter = Array.prototype.filter;
Object.prototype.indexOf = Array.prototype.indexOf;

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
	svg.style['-webkit-transform'] = "rotateZ(" + required_rotate + "deg)";
})

// Form validation
var form = document.querySelector('form');
var name_field = document.querySelector('form [name="name"]');
var name_field_label = document.querySelector('form [name="name"] + span');
var email_field = document.querySelector('form [name="email"]');
var email_field_label = document.querySelector('form [name="name"] + span');
var message_field = document.querySelector('form [name="message"]');
var message_field_label = document.querySelector('form [name="name"] + span');
form.addEventListener('submit', checkFields);

function checkFields(event){
	event.preventDefault();
	var error = false;
	if (name_field.value === ''){
		error = true;
		name_field_label.style.display = 'inline-block';
	} else if (email_field.value === '') {
		error = true;
		email_field_label.style.display = 'inline-block';
	} else if (message_field.value === '') {
		error = true;
		message_field_label.style.display = 'inline-block';
	};

	if (error != true) {
		form.submit();
	}
}

// Menu for small viewports
var menu_button = document.querySelector("#openmenu");
var menu = document.querySelector('.menu');
menu_button.addEventListener('click', openMenu);

function openMenu (event){
	event.preventDefault();
	if (menu.classList.length < 3) {
		menu.classList.add('menu--visible');
	} else {
		menu.classList.remove('menu--visible')
	}
}

// Filter portfolio
var filterButtons = document.querySelectorAll('.portfolioFilter__button');
filterButtons.forEach(function(el){
	el.addEventListener('click', filterPortfolio)
})

var portfolioElements = document.querySelectorAll('.portfolioElement');
var filteredPortfolioElements = [];
var choosedTags = [];

function filterPortfolio(event){
	event.preventDefault();

	// Метка на нажатой кнопке
	var requiredTag = event.target.dataset.tag;

	// Если такая метка уже выбрана :
	if (choosedTags.indexOf(requiredTag) >= 0){
		choosedTags.pop(choosedTags.indexOf(requiredTag));
		event.target.classList.remove("portfolioFilter__button--choosed");
		filterPortfolioItems(choosedTags);
	} else {
	// Если метка не выбрана :
		choosedTags.push(requiredTag);
		event.target.classList.add("portfolioFilter__button--choosed");
		filterPortfolioItems(choosedTags);
	};

	function filterPortfolioItems (choosed_tags){
		// Массив содержит в себе элементы которые надо скрыть
		filteredPortfolioElements = portfolioElements.filter(function(element){
			var element_tags = element.dataset.tags.split(',');		
			element_tags.forEach(function(tag){
				if (choosed_tags.indexOf(tag) >= 0) {
					console.log("true");
					return true
				} else {
					console.log("false");
					return false
				}
			})
		})
	}

	// event.target.classList.add("portfolioFilter__button--choosed");
	// requiredTag = event.target.dataset.tag;
	// filteredPortfolioElements = portfolioElements.filter(function(element){
	// 	var element_tags = element.dataset.tags.split(',');
	// 	if (element_tags.indexOf(requiredTag) >= 0) {
	// 		return false
	// 	} else {
	// 		return true
			
	// 	}
	// });

	// // Грязный хак,обязательно переделать:
	// portfolioElements.forEach(function(element){
	// 	element.style.display = 'inline-block';
	// })	

	// filteredPortfolioElements.forEach(function(element){
	// 	element.style.display = 'none';
	// })
}