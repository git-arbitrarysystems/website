Module.export( function(){
	
	'use strict'
	
	function SimpleModule(){
		this.greet();
	}

	SimpleModule.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am a simple Module without requirements');
	}

	return SimpleModule;

});