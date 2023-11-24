Module.export({requires:[
		{url:'/modules/examples/assets/htmlmodule.css', id:'css'},
		{url:'/modules/examples/assets/htmlmodule.htm', id:'htm'},
		{url:'/modules/examples/assets/htmlmodule.php', id:'php'},
		{url:'/modules/examples/assets/htmlmodule.txt', id:'txt'}
	]}, function(){

		'use strict'

		function HTMLModule(){

			var node = document.createElement('div');
				node.innerHTML = HTMLModule.data.htm;
			var body = document.getElementsByTagName('body')[0];
				while( node.children.length ) body.appendChild( node.children[0] );

			var htmlNode = document.getElementsByClassName('htmlmodule')[0];
				htmlNode.innerHTML += HTMLModule.data.php + '<textarea>'+ HTMLModule.data.txt +'</textarea>';

			htmlNode.addEventListener('remove-node', function(){
				if( confirm('Do you want to remove this node?') ){
					htmlNode.remove();
				}
				
			});

			this.greet();
		}

		HTMLModule.prototype.greet = function(){
			if( window.console ) console.log('Hello! I am a module with .php, .txt, .css and .htm files in the requirements', HTMLModule.data );
		}

		return HTMLModule;

});