Module.export({
	requires:[
		'/shared/polyfills/ParentNode.prepend.js',
		'/shared/pixi/4.8.2/pixi.js',
		'/shared/ResizeListener.js'
	]
}, function(){

	'use strict'

	function MiniApplication(options){

		if( options === undefined ) options = {};
		if( options.backgroundColor === undefined ) options.backgroundColor = 0xffffff;
		if( options.sharedTicker === undefined ) options.sharedTicker = true;
		//if( options.forceCanvas === undefined ) options.forceCanvas = true;
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];
		if( options.mode === undefined ) options.mode = 'prepend';

		PIXI.Application.call(this, options);
		if( options.mode === 'prepend' ){
			options.target.prepend(this.view);
		}else{
			options.target.appendChild(this.view);
		}

		this.renderer.plugins.interaction.autoPreventDefault = false;
		this.renderer.view.style.touchAction = 'auto';
		this.renderer.view.style.width = '100%';
		this.renderer.view.style.height = '100%';
		
		

		var self = this;
		ResizeListener.get().addEventListener('resize', function(event){
			self.renderer.resize(self.view.offsetWidth, self.view.offsetHeight);
		}).nudge();

		

	}

	MiniApplication.prototype = Object.create( PIXI.Application.prototype );
	MiniApplication.prototype.constructor = MiniApplication;


	MiniApplication.prototype.pause = function(){

	}

	return MiniApplication;

});