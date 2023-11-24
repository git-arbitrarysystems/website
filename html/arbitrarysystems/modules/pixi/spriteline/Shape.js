Module.export({requires:'/shared/pixi/4.8.2/pixi.js'},function(){

	'use strict'

	function Shape(shape){
		PIXI.Container.call(this);
		this.shape = shape;
	}
	Shape.prototype = Object.create( PIXI.Container.prototype );
	Shape.prototype.constructor = Shape;

	

	Shape.prototype._lines;
	Shape.prototype._points;
	Shape.prototype._sides = 0;

	Shape.prototype.sides = function(num){

		
		if( num === undefined ) return this._sides;

		if( this._lines === undefined ) this._lines = [];
		if( this._points === undefined ) this._points = [];
		
		while( this._lines.length < num ) this._lines.push( this.addChild( new modules.pixi.spriteline.Line() ));
		while( this._points.length < num ) this._points.push( new modules.pixi.spriteline.Point() );

		this._sides = num;

		for( var i=num;i<this._lines.length;i++){
			this._lines[i].update(0)//, this._lines[i].rotation + Math.PI * 0.5);

			var a = Math.atan2(this._points[i].x,this._points[i].y);
			this._points[i].update(
				Math.sin(a) * 100,
				Math.cos(a) * 100
			);
		}
		return this._sides;
	}


	Shape.prototype._shape;
	Object.defineProperty(Shape.prototype, 'shape', {
		get:function(){
			return this._shape
		},
		set:function(value){
			
			

			var shapes = ['line','triangle', 'rectangle', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon','undecagon', 'dodecagon' ];
			if( value === 'random' ){
				while(true){
					value = shapes[ Math.floor( Math.random() * (shapes.length) ) ];
					if( value !== this._shape ) break;
				}
			}else if( value === 'next' ){
				value = shapes[ (shapes.indexOf(this._shape)+1)%shapes.length ];
			}
			//if( window.console ) console.log('modules.spriteline.Shape.prototype.shape:', value);

			modules.pixi.mixin.Tweenable.framesPerTween = 30;

			this._shape = value;
			var n = this.sides( shapes.indexOf(value)+2 );
			var r = 0;//Math.random() * Math.PI * 2;

			var radius = this.radius || 50,
				a = ( Math.PI * 2 ) / n,
				segmentLength = 2*radius * Math.sin(Math.PI/n),
				x,y;


			for(var i=0;i<n;i++){
				x = Math.sin( -r - (a*i)  ) * radius// - Math.sin(-a) * segmentLength * 0.5;
				y = Math.cos( -r - (a*i)  ) * radius// - Math.cos(-a) * segmentLength * 0.5;

				this._points[i].update(x,y);
				this._lines[i].update(segmentLength, r + a * (i-0.5));
				this._lines[i].height = 1
				this._lines[i].scale.x = Math.abs( this._lines[i].scale.x)
			}

			

		}
	});

	Shape.prototype.update = function(){
		for(var i=0;i<this._lines.length;i++){
			this._points[i].tweenable.update();
			this._lines[i].x = this._points[i].x;
			this._lines[i].y = this._points[i].y;
			this._lines[i].tweenable.update();
		}
	}

	return Shape;

})