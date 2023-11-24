Module.export({requires:'/shared/pixi/4.8.2/pixi.js'},function(){

	'use strict'

	

	function Polygon(points){
		PIXI.Graphics.call(this);
	}

	Polygon.prototype = Object.create( PIXI.Graphics.prototype );
	Polygon.prototype.constructor = Polygon;

	Polygon.prototype._points = [];
	Polygon.prototype._newPoints = [];
	Polygon.prototype._oldPoints = [];
	Object.defineProperty(Polygon.prototype, 'points', {
		set:function(value){
			this._oldPoints = this._points;
			this._newPoints = value;
			this.map();
		}
	});


	Polygon.prototype.map = function(){
		//if( window.console ) console.log('Polygon.map', this._oldPoints.length,  '>>',  this._newPoints.length);
		
		var o = this._oldPoints.length,
			n = this._newPoints.length,
			i;


		

		this._points = [];

		// MAP OLD POINTS
		var mappable = this._newPoints.slice(0),
			fold = [],
			mappedPointIndex, mappedPoint;
		for(i=0;i<o;i++){
			mappedPointIndex = this.nearest(this._oldPoints[i], mappable );

			//if( window.console ) console.log('map old', i , 'to new', mappedPointIndex);

			if( mappedPointIndex !== undefined ){

				mappedPoint = mappable.splice(mappedPointIndex, 1)[0]


				this._points.push({
					x:this._oldPoints[i].x, 
					y:this._oldPoints[i].y, 
					tx:mappedPoint.x,
					ty:mappedPoint.y
				});
			}else{

				fold.push(this._oldPoints[i])

			}
		}


		


		var u = mappable.length,
			nearestPointIndex, nearestPoint;
		// CREATE NEW POINTS
		for(i=0;i<u;i++){
			nearestPoint = {x:0,y:0};
			nearestPointIndex = this.nearest(mappable[i], this._points );
			if( nearestPointIndex !== undefined ){
				nearestPoint = {x:this._points[nearestPointIndex].tx, y:this._points[nearestPointIndex].ty}
			}
			this._points.push({x:nearestPoint.x, y:nearestPoint.y, tx:mappable[i].x, ty:mappable[i].y})
		}


		var f = fold.length,
			nearestPointIndex, nearestPoint;
		for(i=0;i<f;i++){
			nearestPointIndex = this.nearest(fold[i], this._points, true );
			if( nearestPointIndex !== undefined ){
				nearestPoint = this._points[nearestPointIndex];
				this._points.push({x:fold[i].x, y:fold[i].y, tx:nearestPoint.tx, ty:nearestPoint.ty})
			}
		}


		


		

		


	}

	Polygon.prototype.nearest = function(point, array, useTx){
		var d = 100000, dx, dy, cd,
			c = array.length, i, n;
		for(i=0;i<c;i++){
			dx = point.x - (useTx ? array[i].tx : array[i].x );
			dy = point.y - (useTx ? array[i].ty : array[i].y );
			cd = Math.sqrt(dx*dx+dy*dy);
			if( cd < d ){
				d = cd;
				n = i;
			}
		}

		return n;
	}

	Polygon.prototype.update = function(){
		
		this.clear();
		if( this._points.length === 0 ) return;
		

		var c = this._points.length,
			i, p, d = 0.90, ad = 1-d,
			r = 5;

		//if( window.console ) console.log(c);
		for(var i=0;i<this._points.length;i++){

			

			p = this._points[i];
			p.x = p.x * d + p.tx * ad;
			p.y = p.y * d + p.ty * ad;
			p.a = Math.atan2(p.x, p.y)
			
			//this.drawRect(p.x-r, p.y-r, r*2, r*2)

		}

		/*this._points.sort( function(a,b){
			return a.a - b.a
		})*/

		this.lineStyle(1,0);
		//this.beginFill(0xffffff);
		for(var i=0;i<this._points.length;i++){
			p = this._points[i];
			this[i===0?'moveTo':'lineTo'](p.x, p.y);
		}
		this.lineTo(this._points[0].x,this._points[0].y)


		this.lineStyle(1,0xff0000);
		var copy = this._points.slice(0);
		copy.sort( function(a,b){
			return a.a - b.a
		})

		for(var i=0;i<copy.length;i++){
			p = copy[i];
			this[i===0?'moveTo':'lineTo'](p.x, p.y);
		}
		this.lineTo(copy[0].x,copy[0].y)


		


	}


	return Polygon;

});