Module.export( function(){
	
	/*
	*
	* DATA
	*
	*/

	var a,b,c,d;

	var size = 3;
	var entities = [];
	for(a=0;a<size;a++) entities.push(a);

	//if (window.console) window.console.log( entities.length, 'entities', entities);


	var points = [];
	for( a=0;a<entities.length;a++ ){
		for(b=0;b<entities.length;b++){
			points.push([entities[a],entities[b]]);
		}
	}
	//if (window.console) window.console.log(points.length , 'points');

	var lines = [];
	for( a=0;a<points.length;a++){
		for(b=a+1;b<points.length;b++){
			lines.push([points[a],points[b]]);
		}
	}
	//if (window.console) window.console.log(lines.length , 'lines');

	var triangles = [];
	for(a=0;a<points.length;a++){
		for(b=a+1;b<points.length;b++){
			for(c=b+1;c<points.length;c++){
				triangles.push( [ points[a], points[b], points[c] ] )
			}
		}
	}
	//if (window.console) window.console.log(triangles.length , 'triangles');

	var a,b,c,d;

	/*
	*
	* GRAPHICS
	*
	*/

	var ctx;
	var ctx_width = 200;
	var ctx_height = 200;
	var space = 5;

	// CREATE GRAPHICS ENV
	function g(target){
		
		var g = document.createElement('canvas');

		g.style.width = '20%'
		g.style.float = 'left';
		g.style.display = 'block'

		target.appendChild( g );
		g.width = ctx_width;
		g.height = ctx_height;
		ctx = g.getContext('2d');
	}

	// RETURN RANDOM COLOR INT
	function rcn(brightness){
		brightness = typeof brightness === 'undefined' ? 1 : brightness;
		return Math.floor(256*Math.random()*brightness);
	}

	// RETURN RANDOM COLOR STRING
	function rc(brightness,alpha){
		alpha = typeof alpha === 'undefined' ? 1 : alpha;
		brightness = typeof brightness === 'undefined' ? 1 : brightness;
		return 'rgba('+rcn(brightness)+','+rcn(brightness)+','+rcn(brightness)+','+alpha+')';
	}

	// ARRAY TO COORDINATES OBJECT
	function atc(_c){
		var d = entities.length;
		return{
			x: space + (ctx_width-space*2 ) * ( _c[0] / (d-1) ),
			y: space + (ctx_height-space*2) * ( _c[1] / (d-1) )
		};
	}

	// DRAW POINT AS CIRCLE
	function p(ca){

		var c = atc(ca);

		ctx.beginPath();
		ctx.arc(c.x,c.y,space*0.6,0,Math.PI*2,false);
		ctx.closePath();

		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.stroke();

		return p;
	}

	// DRAW LINE
	function l(ca){

		var a = atc(ca[0]);
		var b = atc(ca[1]);

		ctx.beginPath();
		ctx.moveTo(a.x,a.y);
		ctx.lineTo(b.x,b.y);
		ctx.closePath();

		ctx.strokeStyle = rc(0,0.1);
		ctx.stroke();

	}

	function t(ca,alpha){
		var a = atc(ca[0]);
		var b = atc(ca[1]);
		var c = atc(ca[2]);

		ctx.beginPath();
		ctx.moveTo(a.x,a.y);
		ctx.lineTo(b.x,b.y);
		ctx.lineTo(c.x,c.y);
		ctx.closePath();

		ctx.fillStyle = rc(1,alpha);
		ctx.fill();

	}

	function create(target, alpha){
		
		g(target);
		
		
		for(a=0;a<triangles.length;a++){
			t(triangles[a],alpha);
		}

		

		
	}

	

	function D2(options){

		var self = this;

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];


		this.container = document.createElement('div');
		this.container.style.width = '100%'; 
		this.container.style.height = '100%';

		this.container.style.cursor = 'pointer';
		this.container.style.overflow = 'hidden';
		this.container.addEventListener('click', function(){
			self.shuffle()
		})
		/*container.style.overflow = 'auto';*/

		options.target.appendChild(this.container);

		
		this.shuffle();
		
	}

	D2.prototype.shuffle = function(){

		while( this.container.firstChild ){
			this.container.removeChild( this.container.firstChild);
		}

		triangles.sort( function(){ return Math.random() - 0.5; } );

		create(this.container, 0)

		g(this.container);
		for(a=0;a<points.length;a++){
			p(points[a]);
		}

		g(this.container);
		for(a=0;a<lines.length;a++){
			l(lines[a]);
		}

		var count = 17;
		for(d=1;d<=count;d++) create(this.container, d/count);
	}

	return D2;

})