Module.export({requires:['/modules/examples/assets/modulewithcss.1.css','/modules/examples/assets/modulewithcss.2.css']}, function(){
	
	'use strict'
	
	function ModuleWithCss(){
		this.greet();
	}

	ModuleWithCss.prototype.greet = function(){
		if( window.console ) console.log(
			'Hello! I am a module with two css-files as requirements\n',
			ModuleWithCss.data
		);
	}

	return ModuleWithCss;

})