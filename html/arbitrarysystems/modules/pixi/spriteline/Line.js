Module.export({requires:'/shared/pixi/4.8.2/pixi.js'},function(){
	
	'use strict'
	
	function Line(thickness, color){
		
		PIXI.Sprite.call( this, PIXI.Texture.WHITE );
		this._tweens = {};

		this.tint = color || 0x000000;
		this.width = 0;
		this.height = thickness || 1;
		this.anchor.set(0,0.5);

		modules.pixi.mixin.Tweenable('width', this );
		modules.pixi.mixin.Tweenable('rotation', this );
		
		
	}

	Line.prototype = Object.create( PIXI.Sprite.prototype );
	Line.prototype.constructor = Line;

	Line.prototype.update = function(length, rotation){
		if( length !== undefined ) this.twidth = length;
		if( rotation !== undefined ) this.trotation = rotation;
	}

	return Line;
})