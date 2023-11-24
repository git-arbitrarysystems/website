Module.export( function(){
	
	'use strict'
	
	function AnotherNestedModule(){
		this.greet();
	}
	AnotherNestedModule.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am another nested module');
	}

	return AnotherNestedModule;
})