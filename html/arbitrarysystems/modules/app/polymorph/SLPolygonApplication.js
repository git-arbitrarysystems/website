Module.export({
	requires:[
		'/shared/pixi/4.8.2/pixi.js',
		'/shared/ResizeListener.js',
		'/modules/pixi/mixin/ApplicationOnOff.js',
		{module:'/modules/pixi/MiniApplication.js'},
		{module:'/modules/pixi/mixin/Tweenable.js'},
		{module:'/modules/pixi/spriteline/Point.js'},
		{module:'/modules/pixi/spriteline/Line.js'},
		{module:'/modules/pixi/spriteline/Polygon.js'}
	]
}, function(){
	

	'use strict'

	function SLPolygonApplication(options){
		modules.pixi.MiniApplication.call(this, options);
		ApplicationOnOff(options.target);
		
		var self = this,
			time = 0,
			poly = this.stage.addChild(
				new modules.pixi.spriteline.Polygon()
			);
		




		this.ticker.add( function(){
			poly.update();
			if( options.target.on && time%30 === 0 ){
				randomize();
			}
			time++;
		});

		ResizeListener.get().addEventListener('resize', function(){
			poly.x = self.view.offsetWidth * 0.5;
			poly.y = self.view.offsetHeight * 0.5;
		}).nudge();

		function randomize(){
			var o = poly._newPoints.length;
			var n = o;
			while( true ){
				n = Math.floor( Math.random() * 7 ) + 3;
				if( n !== o ) break;
			} 
		
			var p = [], a = 0, i, r = Math.min(self.view.offsetWidth, self.view.offsetHeight) * 0.4;
			for(i=0;i<n;i++){
				a = (i/n) * 2 * Math.PI;
				p.push({x:Math.sin(a)*r, y:Math.cos(a)*r})
			}
			poly.points = p;
		}

		randomize();

		//this.greet(poly);	

	}



	SLPolygonApplication.prototype = Object.create( modules.pixi.MiniApplication.prototype );
	SLPolygonApplication.prototype.constructor = SLPolygonApplication;

	SLPolygonApplication.prototype.greet = function(a){
		if( window.console ) console.log('SLPolygonApplication sais Hi!', (a || this ));
	}

	return SLPolygonApplication;


});