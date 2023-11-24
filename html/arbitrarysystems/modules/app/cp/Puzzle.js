Module.export({
	requires:[
		{url:'/shared/pixi/4.8.2/pixi.js', async:false},
		{url:'/shared/pixi/filters/2.6.1/pixi-filters.js', async:false},
		'/shared/ResizeListener.js',
		'/shared/KeyboardListener.js'
	]
}, function(){

	'use strict'

	function Puzzle(options){

		var self = this;
		window.puzzle = this;

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];
		if( options.image === undefined ) options.image = '/modules/app/cp/white.png';
		if( options.backgroundColor === undefined ) options.backgroundColor = 0xffffff;
		if( options.antialias === undefined ) options.antialias = true;
		if( options.resolution === undefined ) options.resolution = 1;

		options.width = 1200;
		options.height = 1200;

		PIXI.Application.call(this, options)
		options.target.appendChild( this.view );
		
		this.raw = this.stage.addChild( new PIXI.Sprite() );
		this.raw.visible = false;

		// FILTERS
		this.bevel = new PIXI.filters.BevelFilter({thickness:4,shadowAlpha:0.2,lightAlpha:0.2});
		this.blur = new PIXI.filters.BlurFilter(1,10)
		this.blur.blur = 1.5;
		//this.shadow = new PIXI.filters.DropShadowFilter({distance:3, blur:1, quality:3})

		this.container = this.stage.addChild( new PIXI.Container() );
		this.container.interactive = true;

		this.background = this.container.addChild( new PIXI.Graphics() );
		this.background.beginFill(0x000000);
		this.background.drawRect(0,0,options.width, options.height);
		this.background.endFill();

		this.image = options.image;

		

		this.container.scale.set(1)

		ResizeListener.get().addEventListener('resize', function(){ self.resize(); });
		KeyboardListener.get().addEventListener('change', function(event){
			self.dragRotate = this.map.ShiftLeft || this.map.ShiftRight;
			//if( window.console ) console.log(self.dragRotate, this.map);
		})

		


		


	}

	Puzzle.prototype = Object.create( PIXI.Application.prototype );
	Puzzle.prototype.constructor = Puzzle;

	Puzzle.prototype._columns;
	Puzzle.prototype._rows;

	Puzzle.prototype.tileWidth;
	Puzzle.prototype.tileHeight;



	Object.defineProperty(Puzzle.prototype, 'columns', {
		get:function(){
			return this._columns
		},
		set:function(value){
			this._columns = value;

			this.tileWidth = this.raw.texture.width / this.columns;
			this._rows = Math.max(1, Math.round(this.raw.texture.height / this.tileWidth ) );
			this.tileHeight = this.raw.texture.height / this.rows;
			if( window.console ) console.log('Puzzle.columns', this.columns, 'x', this.rows, '('+this.tileWidth+'x'+this.tileHeight+')');

			this.setup();

		}
	});

	Object.defineProperty(Puzzle.prototype, 'rows', {
		get:function(){
			return this._rows
		},
		set:function(value){
			this._rows = value;

			this.tileHeight = this.raw.texture.height / this.rows;
			this._columns = Math.max(1, Math.round(this.raw.texture.width / this.tileHeight ) );
			this.tileWidth = this.raw.texture.width / this.columns;

			if( window.console ) console.log('Puzzle.rows', this.columns, 'x', this.rows, '('+this.tileWidth+'x'+this.tileHeight+')');
			this.setup();
		}
	})



	Puzzle.prototype._image;
	Object.defineProperty(Puzzle.prototype, 'image', {
		enumerable:true,
		get:function(){
			return this._image
		},
		set:function(value){
			this._image = value;
			

			var self = this;

			this.loader.add('image', value );
			this.loader.on('load', function(){
				self.raw.texture = self.loader.resources.image.texture;
				self.columns = 5;
				ResizeListener.get().nudge();
			});
			this.loader.load();

		}
	});


	function shift(bezierObject, x, y){
		var i,s;
		for(i=0;i<6;i++){
			for(s in bezierObject.beziers[i] ){
				bezierObject.beziers[i][s] += (s.indexOf('x') !== -1 ) ? x : y;
			}
		}
		return bezierObject;
	}

	


	Puzzle.prototype.setup = function(){
		if( this.tiles === undefined ) this.tiles = [];
		
		var x,y,
			tile,g,image,
			graphicsScale = 2,
			w = this.tileWidth * graphicsScale,
			h = this.tileHeight * graphicsScale;

		for(var x=0;x<this.columns;x++){

			this.tiles.push([]);

			for(var y=0;y<this.rows;y++){
				
				tile = new PIXI.Container();

				//
				// PREPARE THE SIDES
				//
				var sides = [
					[{x:0,y:0},{x:1,y:0}], // TOP
					[{x:1,y:0},{x:1,y:1}], // RIGHT
					[{x:1,y:1},{x:0,y:1}], // BOTTOM
					[{x:0,y:1},{x:0,y:0}] // LEFT
				]

				if( y > 0 ){
					// MY TOP IS PREVIOUS BOTTOM
					var bottom = this.tiles[x][y-1].sides[2];
					sides[0] = this.bezier(0, bottom.params)
				}

				if( x < this.columns-1 ){
					// MY RIGHT
					sides[1] = shift( this.bezier(Math.PI*0.5), 1, 0);
				}

				if( y < this.rows-1 ){
					// MY BOTTOM
					sides[2] = shift( this.bezier(Math.PI), 1, 1);
				}

				if( x > 0 ){
					// MY LEFT IS PREVIOUS RIGHT
					var right =this.tiles[x-1][y].sides[1];
					sides[3] = shift( this.bezier(Math.PI*1.5, right.params), 0,1)
				}


				

			
				// PUZZLE SHAPE
				g = new PIXI.Graphics();
				
				// DRAW SHAPE
				g.beginFill(0xffffff, 1);
				var i,j;
				for(i=0;i<4;i++){

					if( i=== 0 ) g.moveTo(0,0);

					if( Array.isArray(sides[i]) ){
						// STRAIGHT LINE
						g.lineTo(sides[i][1].x*w,sides[i][1].y*h);
					}else{

						// BEZIER-CURVE
						for(j=0;j<6;j++){
							g.bezierCurveTo(
								sides[i].beziers[j].cx1*w,
								sides[i].beziers[j].cy1*h,
								sides[i].beziers[j].cx2*w,
								sides[i].beziers[j].cy2*h,
								sides[i].beziers[j].ex*w,
								sides[i].beziers[j].ey*h
							);
						}
					}
					

				}
				g.endFill();
				g.filters = [ this.blur ]

				
				var renderSpace = 50,
					bounds = g.getLocalBounds(),
					texture = PIXI.RenderTexture.create( Math.ceil(bounds.width) + renderSpace, Math.ceil(bounds.height) + renderSpace );
				
				g.x = -bounds.x + renderSpace*0.5;
				g.y = -bounds.y + renderSpace*0.5;
				this.renderer.render(g, texture);
				

				

				var background = tile.addChildAt( new PIXI.Sprite(texture), 0 );
				background.scale.set(1/graphicsScale)
				background.x = (bounds.x-renderSpace*0.5) /graphicsScale;
				background.y = (bounds.y-renderSpace*0.5) /graphicsScale;
				background.tint = 0x000000;
				background.alpha = 1;

				var _mask = tile.addChild( new PIXI.Sprite(texture) );
				_mask.scale.set(background.scale.x, background.scale.y)
				_mask.x = background.x;
				_mask.y = background.y;
				
				// GET TEXTURE IMAGE
				var image = tile.addChild( new PIXI.Sprite(this.raw.texture))
				image.x = -x*this.tileWidth;
				image.y = -y*this.tileHeight;
				image.mask = _mask;

				// RECT
				// var rect = tile.addChild(new PIXI.Graphics());
				// rect.beginFill(0x0000ff, 0.25);
				// rect.drawRect(0,0,this.tileWidth, this.tileHeight);
				// rect.endFill();
				

				// FILTERS
				tile.filters = [
					this.bevel
				]


				//FINAL RENDERING
				bounds = tile.getLocalBounds();
				var final_texture = PIXI.RenderTexture.create( Math.ceil(bounds.width) + renderSpace, Math.ceil(bounds.height) + renderSpace ),
					final_tile;

				tile.x = -bounds.x+renderSpace*0.5;
				tile.y = -bounds.y+renderSpace*0.5;

				//if (window.console) window.console.log('final_texture',x,y,bounds, final_texture.width, final_texture);
				
				this.renderer.render(tile, final_texture);
				final_tile = this.container.addChild( new PIXI.Sprite(final_texture) )

				// STORE
				final_tile.sides = sides;
				this.tiles[x].push(final_tile);


				// SET COORDINATES
				final_tile.cx = x;
				final_tile.cy = y;

				
				final_tile.interactive = true;
				final_tile.hitArea = new PIXI.Rectangle(
					-bounds.left+renderSpace*0.5,
					-bounds.top+renderSpace*0.5,
					this.tileWidth,
					this.tileHeight
				);
				final_tile.cursor = 'pointer';
				final_tile.connected = [];
				final_tile.pivot.set(
					this.tileWidth*0.5-bounds.left+renderSpace*0.5,
					this.tileHeight*0.5-bounds.top+renderSpace*0.5
				)
				final_tile.on('pointerdown', this.startDrag, this );

				// var dot = final_tile.addChild( new PIXI.Graphics() );
				// dot.beginFill(0x00ff00,0.15);
				// dot.drawRect(final_texture.width*-0.5, final_texture.height*-0.5,final_texture.width, final_texture.height);
				// dot.endFill();

				// dot.beginFill(0xffffff,1);
				// dot.drawCircle(0,0,5);
				// dot.endFill();
				// dot.x = final_tile.pivot.x;
				// dot.y = final_tile.pivot.y;

				// DISTRIBUTE TEMP
				var spacing = 1.5;
				final_tile.x = 20 + this.tileWidth * (spacing-1) + x * this.tileWidth * spacing;
				final_tile.y = 20 + this.tileHeight * (spacing-1) + y * this.tileHeight * spacing;

			}
		}


		// SET NEIGHBOURS
		for(x=0;x<this.columns;x++){
			for(y=0;y<this.rows;y++){
				tile = this.tiles[x][y];
				tile.neighbours = {};
				if( tile.cx > 0 			) tile.neighbours.left 		= this.tiles[tile.cx-1][tile.cy  ];
				if( tile.cx < this.columns-1) tile.neighbours.right 	= this.tiles[tile.cx+1][tile.cy  ];
				if( tile.cy > 0 			) tile.neighbours.top 		= this.tiles[tile.cx  ][tile.cy-1];
				if( tile.cy < this.rows-1 	) tile.neighbours.bottom 	= this.tiles[tile.cx  ][tile.cy+1];
			}
		}


	}


	Puzzle.prototype.hasMoved = [];
	Puzzle.prototype.moveTile = function(tile, x, y ){

		tile.x += x;
		tile.y += y;
		this.hasMoved.push(tile);
		var i,
			c = tile.connected.length;
		for(i=0;i<c;i++){
			if( this.hasMoved.indexOf(tile.connected[i]) === -1 ){
				this.moveTile(tile.connected[i], x, y);
			}
		}
	}

	Puzzle.prototype.hasRotated = [];
	Puzzle.prototype.rotateTile = function(tile, angle){
		
		tile.rotation = angle;
		if( tile.rotation < -Math.PI ) tile.rotation += Math.PI * 2;
		if( tile.rotation >  Math.PI ) tile.rotation -= Math.PI * 2;
		this.hasRotated.push(tile);
		
		var i,
			c = tile.connected.length;
		for(i=0;i<c;i++){
			if( this.hasRotated.indexOf(tile.connected[i]) === -1 ){
				
				var t = this.getTargetPosition(tile, tile.connected[i] );
				tile.connected[i].x = t.x;
				tile.connected[i].y = t.y;

				this.rotateTile(tile.connected[i], angle);
				
			}
		}
	}


	Puzzle.prototype.dragPosition;
	Puzzle.prototype.dragDelta;
	
	Puzzle.prototype.dragRotate = false;
	Puzzle.prototype.dragRotateAnchor;
	Puzzle.prototype.dragRotateAngle = 0;
	Puzzle.prototype.dragRotateDelta = 0;

	Puzzle.prototype.startDrag = function(event){

		//if( window.console ) console.log('Puzzle.startDrag');
		if( this.dragging ) return;

		// SET 
		this.dragging = event.target;
		this.dragPosition = {
			x:event.data.global.x,
			y:event.data.global.y
		};
		this.dragRotateAnchor = {
			x:this.dragging.x,
			y:this.dragging.y
		};
		this.dragRotateDelta = false;
		this.dragRotateAngle = false;

		// TOP
		this.dragging.parent.addChild(this.dragging);

		// LISTEN
		this.container.on('pointermove', this.dragMove, this );
		this.container.on('pointerup', this.dragEnd, this );
		this.container.on('pointerout', this.dragEnd, this );
		this.container.on('pointercancel', this.dragEnd, this );
	}
	Puzzle.prototype.dragMove = function(event){

		this.dragDelta = {
			x:event.data.global.x - this.dragPosition.x,
			y:event.data.global.y - this.dragPosition.y
		}
		this.dragPosition = {
			x:event.data.global.x,
			y:event.data.global.y
		}

		if( this.dragRotate ){

			var dx = this.dragRotateAnchor.x - this.dragPosition.x,
				dy = this.dragRotateAnchor.y - this.dragPosition.y,
				d = Math.sqrt(dx*dx+dy*dy),			
				angle = -Math.atan2(dx,dy);
			if( d > 10 ){
				if( this.dragRotateAngle === false ) this.dragRotateAngle = angle;
				this.dragRotateDelta = angle - this.dragRotateAngle;
				this.dragRotateAngle = angle;

				this.hasRotated = [];
				this.rotateTile(this.dragging, this.dragging.rotation + this.dragRotateDelta)


				//if( window.console ) console.log(this.dragRotateDelta);
			}
			
			return;
			

				



		}

		this.hasMoved = [];
		this.moveTile( this.dragging, this.dragDelta.x, this.dragDelta.y );
	}
	Puzzle.prototype.dragEnd = function(event){

		//if( window.console ) console.log('Puzzle.dragEnd');

		this.container.off('pointermove', this.dragMove );
		this.container.off('pointerup', this.dragEnd );
		this.container.off('pointerout', this.dragEnd, this );
		this.container.off('pointercancel', this.dragEnd, this );

		this.hasBeenChecked = [];
		this.check(this.dragging);

		this.dragging = false;
	}

	Puzzle.prototype.hasBeenChecked = [];
	Puzzle.prototype.check = function(tile){

		

		var neighbour,
			s,c,i,
			
			x = tile.x,
			y = tile.y,
			
			nx,ny,tx,ty,tdx,tdy,dx,dy,
			
			precision = 10,
			rotationPrecision = 0.2,
			
			sin = Math.sin(tile.rotation),
			cos = Math.cos(tile.rotation),
			ddr,
			
			result;

		this.hasBeenChecked.push(tile);

		for(s in tile.neighbours){

			neighbour = tile.neighbours[s];

			if( tile.connected.indexOf(neighbour) === -1 ){

				ddr = tile.rotation - neighbour.rotation;


				//if( s === 'right' && window.console) window.console.log(ddr, tile.rotation, neighbour.rotation);

				if( ddr > -rotationPrecision && ddr<rotationPrecision ){

					// TARGET POS RELATIVE
					tdx = (neighbour.cx - tile.cx) * this.tileWidth;
					tdy = (neighbour.cy - tile.cy) * this.tileHeight;
					
					// ABSOLUTE TARGET POS
					tx = -tdy * sin + tdx * cos + x;
					ty =  tdy * cos + tdx * sin + y;
					
					// DELTA
					dx = neighbour.x - tx;
					dy = neighbour.y - ty;

					if (window.console) window.console.log(s, tile.x,(neighbour.cx - tile.cx), dx, tdx, tx);

		
					if( dx > -precision && dx < precision && dy > -precision && dy < precision ){
						if (window.console) window.console.log('connect');
						this.connect(tile, neighbour);
						return true;
					}

				}
				
				

			}

			
		}


		c = tile.connected.length;
		for(i=0;i<c;i++){
			if( this.hasBeenChecked.indexOf(tile.connected[i]) === -1 ){
				result = this.check( tile.connected[i] );
				if( result ) break;
			}
			
		}



	}

	Puzzle.prototype.getTargetPosition = function(original, target){
		var sin = Math.sin(original.rotation);
		var cos = Math.cos(original.rotation);

		// TARGET POS RELATIVE
		var tdx = (target.cx - original.cx) * this.tileWidth;
		var tdy = (target.cy - original.cy) * this.tileHeight;
		
		// ABSOLUTE TARGET POS
		var tx = -tdy * sin + tdx * cos + original.x;
		var ty =  tdy * cos + tdx * sin + original.y;

		return {x:tx, y:ty};

	}

	Puzzle.prototype.connect = function(original, target ){

		original.rotation = target.rotation;

		var t = this.getTargetPosition(original, target),
			dx = (target.x - t.x ),
			dy = (target.y - t.y );

		this.hasMoved = [];
		this.moveTile(original, dx, dy);
		
		if( original.connected.indexOf(target) === -1 ) original.connected.push(target);
		if( target.connected.indexOf(original) === -1 ) target.connected.push(original);


	}




	Puzzle.prototype.resize = function(){
		//if( window.console ) console.log('Puzzle.prototype.resize', this.screen );
		this.background.clear();
		this.background.beginFill(0xffffff);
		this.background.drawRect(0,0,this.screen.width, this.screen.height);
		this.background.endFill();
		//this.bezier_test();
	}


	Puzzle.prototype.bezier = function(rotate, params ){

		var flip = false,
			c = 0.50 + (Math.random()-0.5) * 0.20, // CENTER
			d = 0.05, // DIVE
			a = 0.25 + (Math.random()-0.5) * 0.10, // AMP
			w = 0.25 + (Math.random()-0.5) * 0.20  // WIDTH

		if( params ){
			c = 1 - params.c;
			a = params.a;
			w = params.w;
			flip = !params.flip;
		}

		var beziers = [
			{cx1: 0.00		,	cy1: 0.00	,	cx2: c-w*0.50	,	cy2: a*0.75	,	ex: c-w*0.43	,	ey: d 	},   // left shoulder
			{cx1: c-w*0.43	,	cy1: d		,	cx2: c-w*0.33	,	cy2: 0.00	,	ex: c-w*0.40	,	ey:-d 	},  // left neck
			{cx1: c-w*0.40	,	cy1:-d 		,	cx2: c-w 		,	cy2:-a 		,	ex: c   		,	ey:-a 	}, // left head
			{cx1: c   		,	cy1:-a		,	cx2: c+w 		,	cy2:-a 		,	ex: c+w*0.40	,	ey:-d 	},  // right head
			{cx1: c+w*0.40	,	cy1:-d 		,	cx2: c+w*0.33	,	cy2: 0.00	,	ex: c+w*0.43	,	ey: d 	},   // right neck
			{cx1: c+w*0.43	,	cy1: d 		,	cx2: c+w*0.50	,	cy2: a*0.75	,	ex: 1.00		,	ey: 0.00}   // right shoulder
	    ]

	    //Math.random() < 0.5;



	    // NORMALIZE BEZIER
	    if( rotate || flip ){
	    	var rotated = [];

	    	var sin = Math.cos(rotate),
	    		cos = Math.sin(rotate);

	    	for( var i=0;i<6;i++){

	    		if( flip ){
	    			beziers[i].cy1 *= -1;
	    			beziers[i].cy2 *= -1;
	    			beziers[i].ey  *= -1;
	    		}

	    		if( rotate ){
	    			rotated.push({
						cx1:beziers[i].cx1*sin + beziers[i].cy1*cos, 
						cy1:beziers[i].cx1*cos + beziers[i].cy1*sin,
						cx2:beziers[i].cx2*sin + beziers[i].cy2*cos,
						cy2:beziers[i].cx2*cos + beziers[i].cy2*sin,
						ex :beziers[i].ex*sin + beziers[i].ey*cos,
						ey :beziers[i].ex*cos + beziers[i].ey*sin
					});
	    		}
		    	
		    }
		    if( rotate ){
		    	beziers = rotated;
		    }
		    
	    }
	    

	    return {
	    	params:{c:c, a:a, w:w, flip:flip},
	    	beziers:beziers
	    };
	  		
	}


	return Puzzle;

});