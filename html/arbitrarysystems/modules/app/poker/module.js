Module.export({requires:[
		'/modules/app/poker/Poker.css',
		'/modules/app/poker/Graph.css',
		{url:'/modules/app/poker/index.js', jsModule:true}

	]},function(){

		'use strict'

		function Poker(options){

			console.log('Hoi', options, pokerDemo)
			
			var extended = window.location.href.indexOf('poker') !== -1;

			var node = document.createElement('div');
			node.style.width = '100%';
			node.style.height = '100%';
			node.style.background = '#fff'
			node.style.padding = '2em';
			node.style.overflow = 'hidden'
			node.style.textAlign = 'center';
			pokerDemo(node, extended );

			var link = document.createElement('a');
				link.href = '?module=/modules/app/poker/module.js';
				link.innerHTML = '>> 9p+Graph';
	     		link.style.left = 0;
				link.style.right = 0;
				link.style.bottom = 0;
				link.style.padding = '1em'
				link.style.backgroundColor = 'rgba(0,0,255,0.3)';
				link.style.position = 'absolute';
				link.style.textAlign = 'center';
				

			var target = options.target || document.getElementsByTagName('body')[0];
				if( !extended ) node.appendChild( link );
				target.appendChild( node );
			

			/*
			var node = document.createElement('div');
				node.innerHTML = 	'<div id="poker-target"></div>' + 
									'<link rel="stylesheet" type="text/css" href="'+baseUrl+'Poker.css">'+
									'<link rel="stylesheet" type="text/css" href="'+baseUrl+'Graph.css">'+
									'<script type="module" src="'+baseUrl+'index.js"></script>';
			var target = options.target || document.getElementsByTagName('body')[0];
				while( node.children.length ) target.appendChild( node.children[0] );

*/


		}



		return Poker;

});