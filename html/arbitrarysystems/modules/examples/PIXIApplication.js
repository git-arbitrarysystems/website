Module.export({
	requires:['/shared/pixi/4.8.2/pixi.js',{
		id:'options',
		url:'/modules/examples/assets/PIXIApplication.json'
	}]
}, function(){
	
	'use strict'
	
	function PIXIApplication(){
		this.greet();
		//PIXI.Application.call(this, PIXIApplication.data.options );
	}

	PIXIApplication.prototype = Object.create( PIXI.Application.prototype );
	PIXIApplication.prototype.constructor = PIXIApplication;

	PIXIApplication.prototype.greet = function(){
		if( window.console ) console.log(
			'Hello! I am a module that extends PIXI.Application',
			'\nMy options are loaded from a JSON-file with an id',
			PIXIApplication.data.options );
	}

	return PIXIApplication;

})