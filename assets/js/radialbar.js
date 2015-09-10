'use strict';

function radialBar (){

}

radialBar.prototype.init = function(options){
	this.config = {
		height: options.height || 200;
		width: options.width || 200;
		color: options.color || "black";
	};

	document.addEventListener('domcontentloaded', this.readyToDraw)
}

radialBar.prototype.readyToDraw = function(){
	
}