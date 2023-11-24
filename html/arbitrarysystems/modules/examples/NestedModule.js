Module.export( function(){
	
	'use strict'
	
	function NestedModule(){
		this.greet();
	}
	NestedModule.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am a nested module');
	}

	return NestedModule;
})