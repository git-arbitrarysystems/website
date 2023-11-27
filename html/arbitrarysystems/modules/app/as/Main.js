Module.export({
	requires:[
		'/shared/dom/prependHTMLString.js',
		'/modules/app/as/main.css',
		{id:'php', url:'/modules/app/as/main.php'},
		{module:'/modules/grid/CssGrid.js'}
	]
}, function(){

	'use strict'

	function Main(options){
		this.greet();

		var body = document.getElementsByTagName('body')[0];
			dom.prependHTMLString( body, Main.data.php );

		var wrapper = body.getElementsByClassName('site-wrapper')[0],
			header = wrapper.getElementsByTagName('header')[0],
			menu = wrapper.getElementsByTagName('nav')[0],
			content = wrapper.getElementsByClassName('content')[0],
			footer = wrapper.getElementsByTagName('footer')[0],
			btn_close = menu.getElementsByClassName('button close')[0];

		btn_close.addEventListener('click', function(){
			if( menu.classList.contains('close-only') ){
				window.location.href = '/';
			}else{
				menu.classList.toggle('open');
			}
			
		})

		// REPLACE THE MODULE DASHBOARD
		var grid = new modules.grid.CssGrid(content);
		grid.getNode({nodeClass:'_5cols endOfGrid _3rows'}).appendChild( document.getElementById('dashboard') );


		if( options.getModule ){

			menu.classList.add('close-only')

			grid.load([
				[options.getModule, {nodeClass:'_5cols fullHeight'}]
			]);
		}else{
			grid.load([
				['/modules/app/gour/module.js', {nodeClass:'_5cols _3rows'}],
				['/modules/app/poker/module.js', {nodeClass:'_5cols _5rows'}],
				['/modules/app/fun_with_flags/FWF.js', {nodeClass:'_5cols _3rows'}],
				['/modules/app/spider/Spider.js', {nodeClass:'_5cols fullHeight'}],
				['/modules/test/IrregularLines.js', {nodeClass:'_5cols no-border'}],
				['/modules/quote/Quote.js', {nodeClass:'_5cols fullHeight no-border'}],
				['/modules/test/KopfFuessler.js', {nodeClass:'_2rows'}],
				['/modules/app/piano/Piano.js', {nodeClass:'_5cols'}],
				['/modules/app/polymorph/SpriteShapeApplication.js', {}],
				['/modules/app/polymorph/SLPolygonApplication.js', {}],
				['/modules/app/grid33/D3/D3.js', {nodeClass:'_2rows _2cols'}],
				['/modules/app/grid33/D2/D2.js', {nodeClass:'_5cols', ratio:0.8}],
				['/modules/test/AutoGray.js', {}]/*,
				['/modules/quote/Quote.js', {nodeClass:'_5cols _1rows no-border',id:'LikeABirdOnAWire'}]*/
			]);
		}



		

	}

	Main.prototype.greet = function(){
		if( window.console ) console.log('Welcome to arbitrarysystems.com');//, Main.data.php);
	}


	return Main
})