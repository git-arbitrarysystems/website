Module.export({
	requires:[
		{module:'/modules/examples/NestedModule.js'},
		{module:'/modules/examples/AnotherNestedModule.js'}
]}, function(){
	
	'use strict'
	
	function ContainingModule(){
		this.greet();
		new modules.examples.NestedModule();
		new modules.examples.AnotherNestedModule();
	}
	
	ContainingModule.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am a containing module');
	}

	return ContainingModule;
})