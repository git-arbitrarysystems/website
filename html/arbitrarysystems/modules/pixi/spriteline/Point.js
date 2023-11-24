Module.export({requires:'/shared/pixi/4.8.2/pixi.js'},function(){
	
	'use strict'

	function Point(x,y){
		this.x = x || 0;
		this.y = y || 0;
		modules.pixi.mixin.Tweenable('x', this );
		modules.pixi.mixin.Tweenable('y', this );
	}

	Point.prototype.update = function(x,y){
		if( x !== undefined ) this.tx = x;
		if( y !== undefined ) this.ty = y;
	}

	return Point;

})