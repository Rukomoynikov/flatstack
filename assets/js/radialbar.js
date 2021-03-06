function RadialBar(options){
	this.config = {
		height: options.height || 200,
		width: options.width || 200,
		barWidth: options.barWidth || 20,
		mainColor: options.mainColor || "blue",
		backgroundColor: options.backgroundColor || "#383838",
		domObj : options.domObj || 'body',
		procent : options.procent || 100
	};

	this.config.domObj = document.querySelector(this.config.domObj);

	document.addEventListener('DOMContentLoaded', this.readyToDraw.bind(this))

	return this
}

RadialBar.prototype.readyToDraw = function readyToDraw (){
	this.container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.container.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	this.container.setAttribute('width', this.config.width)
	this.container.setAttribute('height', this.config.height)
	this.container.setAttribute('viewPort', '0 0 200 200')
	this.container.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
	this.container.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
	this.container.style.fill = 'transparent';

	this.background_bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	this.background_bar.classList.add('background_bar');
	this.background_bar.setAttribute('cx', this.config.width / 2)
	this.background_bar.setAttribute('cy', this.config.width / 2)
	this.background_bar.setAttribute('r', (this.config.width - this.config.barWidth) / 2)
	this.background_bar.style.fill =  'transparent';
	this.background_bar.style.stroke = this.config.backgroundColor;
	this.background_bar.style.strokeWidth = this.config.barWidth;

	this.main_bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	this.main_bar.classList.add('main_bar');
	this.main_bar.setAttribute('cx', this.config.width / 2)
	this.main_bar.setAttribute('cy', this.config.width / 2)
	this.main_bar.setAttribute('r', (this.config.width - this.config.barWidth) / 2)
	this.main_bar.style.fill =  'transparent';
	this.main_bar.style.stroke = this.config.mainColor;
	this.main_bar.style.strokeWidth = this.config.barWidth;

	this.container.appendChild(this.background_bar);
	this.container.appendChild(this.main_bar);

	this.config.domObj.appendChild(this.container);

	this.drawBars()
}

RadialBar.prototype.drawBars = function(){
	// Узнать длину окружности
	this.main_bar.radius = this.main_bar.getAttribute('r');
	this.main_bar.circleLength = (Math.PI *  this.main_bar.radius ) * 2;

	// Вычислить сколько в пикселях необходим отступ в баре
	if (this.config.procent !== 100){
		this.main_bar.offset = ((100 - this.config.procent) / 100 ) * this.main_bar.circleLength;
	} else {
		this.main_bar.offset = this.main_bar.circleLength;
	}

	// Анимация для баров
	this.main_bar.style.transition = 'stroke-dashoffset 1s linear';

	// this.main_bar.addEventListener('mouseover', addAnimate)

	// Присвоить необходимые значения барам
	this.main_bar.style.strokeDasharray = this.background_bar.style.strokeDasharray = this.main_bar.circleLength
	this.main_bar.style.strokeDashoffset = this.main_bar.offset

	// Хак, для того чтобы начало бара было там где должно быть, иначе начинается справа на отметке 90%.
	this.container.style.transform = "rotateZ(270deg)";
	this.container.style['-webkit-transform'] = "rotateZ(270deg)";
}

// Создание четырёх баров.
var radial90 = new RadialBar({
	domObj : '.oneSkill__radial--90',
	mainColor: '#3c989e',
	backgroundColor : '#c7c7c7',
	procent : 90
});

var radial75 = new RadialBar({
	domObj : '.oneSkill__radial--75',
	mainColor: '#ed5276',
	backgroundColor : '#c7c7c7',
	procent : 75
});

var radial70 = new RadialBar({
	domObj : '.oneSkill__radial--70',
	mainColor: '#5db5a4',
	backgroundColor : '#c7c7c7',
	procent : 70
});

var radial85 = new RadialBar({
	domObj : '.oneSkill__radial--85',
	mainColor: '#f57a82',
	backgroundColor : '#c7c7c7',
	procent : 85
});