Module.export( function(){
	
	'use strict'
	
	function Examples(){

		this.greet();

		Module.load('/modules/examples/SimpleModule.js', function(){
			new modules.examples.SimpleModule();
		});

		Module.load('/modules/examples/ModuleWithCss.js', function(){
			new modules.examples.ModuleWithCss();
		});

		Module.load('/modules/examples/PIXIApplication.js', function(){
			new modules.examples.PIXIApplication();
		});

		Module.load('/modules/examples/ContainingModule.js', function(){
			new modules.examples.ContainingModule();
		});
	
		Module.load('/modules/examples/NotExistingModule.js', function(){
			new modules.examples.NotExistingModule();
		}, function(){
			if( window.console ) console.log('==> This module does not exist');
		});

		Module.load('/modules/examples/BrokenModule.js', function(){
			new modules.examples.BrokenModule();
		}, function(){
			if( window.console ) console.log('==> This module tries to load invalid JSON with content => "' + this.requires[0].loader.content + '"' );
		});

		Module.load('/modules/examples/HTMLModule.js', function(){
			new modules.examples.HTMLModule();
		});


	}

	Examples.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am the Examples Module');
	}

	return Examples

});