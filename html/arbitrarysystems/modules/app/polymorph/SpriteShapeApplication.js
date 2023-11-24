Module.export({
	requires:[
		'/shared/pixi/4.8.2/pixi.js',
		'/shared/ResizeListener.js',
		'/modules/pixi/mixin/ApplicationOnOff.js',
		{module:'/modules/pixi/MiniApplication.js'},
		{module:'/modules/pixi/mixin/Tweenable.js'},
		{module:'/modules/pixi/spriteline/Point.js'},
		{module:'/modules/pixi/spriteline/Line.js'},
		{module:'/modules/pixi/spriteline/Shape.js'}
	]
}, function(){
	

	'use strict'

	function SpriteShapeApplication(options){
		modules.pixi.MiniApplication.call(this, options);

		ApplicationOnOff(options.target);
		
		var self = this,
			shape = this.stage.addChild( new modules.pixi.spriteline.Shape('triangle') ),
			time = 0;

		this.ticker.add( function(){
			shape.update();
			time++;
			if( options.target.on && time%(modules.pixi.mixin.Tweenable.framesPerTween*2) === 0 ){
				shape.shape = 'random'
			}
		});

		ResizeListener.get().addEventListener('resize', function(){
			shape.x = self.view.offsetWidth * 0.5;
			shape.y = self.view.offsetHeight * 0.5;
			shape.radius = Math.min( self.view.offsetWidth * 0.5, self.view.offsetHeight * 0.5 ) * 0.8
		})

	}



	SpriteShapeApplication.prototype = Object.create( modules.pixi.MiniApplication.prototype );
	SpriteShapeApplication.prototype.constructor = SpriteShapeApplication;

	return SpriteShapeApplication;


});