Module.export({
	requires:[
	'/modules/app/fun_with_flags/fwf.css'
	]
},
	function(){

	function FWF(options){
		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0]

		var container = document.createElement('a'),
			count = 150;
		if( window.location.href.indexOf('fun_with_flags') === -1 ){
			container.href = '/?module=modules/app/fun_with_flags/FWF.js';
			count = 20;
		}else{
			//container.onclick = function(){ window.location.reload() } 
		}
		container.className = 'flag-container';


		options.target.appendChild( container );

		this.options = options;
		if( window.console ) console.log('FWF', options, FWF.ratio, FWF.layout );

		for(var i=0;i<count;i++){
			container.appendChild(
				new Flag(i).canvas
			)
		}
	}

	


	function Flag(index){
		this.identifier = index+'';
		this.canvas = this.create(150);
	}

	Flag.prototype.selectRatio = function(){
		return 2/3;
	}

	Flag.prototype.randomCssColor = function(){

		var cs = '#';
		for(var i=0;i<3;i++){
			cs += '05AF'.charAt( Math.floor(Math.random() * 4) )
		}
		return cs;
	}

	Flag.prototype.setColors = function(array, max){
		while( array.length < max ){
			array.push( this.randomCssColor() );
		}
		return array;
	}

	Flag.prototype.append = function(array){

		var appendString = array;
		if( Array.isArray(array) ) appendString = array[ Math.floor(Math.random()*array.length) ]

		// FIND AND REPLACE OPTIONALS
		var brackets = /\[(.*?)\]/i,
			result;
			while(true){
				result = brackets.exec(appendString);
				if( result ){
					appendString = appendString.replace(brackets, function(){
						var a = result[1].split('|'),
							r = a[ Math.floor(Math.random()*a.length) ];
						return r;
					})
				}else{
					break;
				}
			}
		
		if( appendString.length > 0 ){
			if( this.identifier.length > 0 ) this.identifier += '-';
			this.identifier += appendString;
		}
		
		
	}

	Flag.prototype.contains = function(what){
		return (this.identifier.indexOf(what) >= 0);
	}

	Flag.prototype.dr = function(x,y,w,h,c){
		this.ctx.beginPath();
		this.ctx.rect(x,y,w,h);
		this.ctx.fillStyle = c;
		this.ctx.fill();
	}

	 Flag.prototype.star = function(cx,cy,spikes,outerRadius,innerRadius,color){
		
		var i,
			rot = Math.PI/2,
			x = cx,
			y = cy,
			step = Math.PI/spikes;

		this.ctx.beginPath();
		this.ctx.moveTo(cx+Math.cos(rot)*outerRadius,cy+Math.sin(rot)*outerRadius);
		for(i=0;i<spikes;i++){
			x=cx+Math.cos(rot)*outerRadius;
			y=cy+Math.sin(rot)*outerRadius;
			this.ctx.lineTo(x,y)
			rot+=step

			x=cx+Math.cos(rot)*innerRadius;
			y=cy+Math.sin(rot)*innerRadius;
			this.ctx.lineTo(x,y)
			rot+=step
		}
		this.ctx.lineTo(cx+Math.cos(rot)*outerRadius,cy+Math.sin(rot)*outerRadius);
		this.ctx.closePath();

		this.ctx.fillStyle = color;
		this.ctx.fill();
		
	}

   
	

	Flag.prototype.create = function(width){
		var ratio = this.selectRatio(),
			height = Math.round(width * ratio),
			canvas = document.createElement('canvas'),
			colors = [];
		

		canvas.width = width;
		canvas.height = height;
		canvas.className = 'flag';

		this.ctx = canvas.getContext('2d');


		this.append('R' + Math.floor(ratio*100));
		this.append(['monocol','[H|V]stripes[9|11|13]','[H|V]tricol[|MatchOuter]','[H|V]duocol', '[H|V]quatrocol[|MatchOuter]']);
		
		if( this.contains('monocol') || this.contains('stripes') ){
			this.append(['block[L|R][T|B][N|N|W|H]',''])
		}
		
		if( !this.contains('block') ){
			if( this.contains('duocol') || this.contains('monocol') ){
				this.append(['triangle[L|T|B]_trix[1|2|3|4]','']);
			}else if( this.contains('Hstripes') || this.contains('Htricol') ){
				this.append(['triangle[L]_trix[1|2|3|4]','']);
			};
		}

		if( this.contains('monocol') || this.contains('block') || this.contains('stripes') ){
			this.append(['', 'cross','star', 'circ', 'sun']);

		}
		
		
		

		
		var stripeCount = 1;
			if( this.contains('duocol') 	){ stripeCount = 2; } else
			if( this.contains('tricol') 	){ stripeCount = 3; } else
			if( this.contains('quatrocol') 	){ stripeCount = 4; } else
			if( this.contains('stripes') 	){
				var stripeCountRegex = /[V|H]stripes(\d+)/i;
			    stripeCount = parseInt( stripeCountRegex.exec(this.identifier)[1], 10 )
			}
		var horizontalRegExp = /monocol|Hduocol|Htricol|Hquatrocol|Hstripes/i,
			horizontal = horizontalRegExp.test(this.identifier);

		this.setColors(colors, stripeCount);
		if( this.contains('MatchOuter') ){
			colors[stripeCount-1] = colors[0];
		}else if( this.contains('stripes') ){
			colors = colors.slice(0,2);
		}

		var i,color;
		for(i=0;i<stripeCount;i++){
			color = colors[i%colors.length];
			if( horizontal ){
				this.dr(0,(i/stripeCount) * height,width,Math.ceil(height/stripeCount), color)
			}else{
				this.dr( (i/stripeCount)*width, 0, Math.ceil(width/stripeCount), height, color );
			}
		}


		// DEFAULT BLOCK
		var blockBox = {
			x:0,
			y:0,
			width:width,
			height:height
		};

		if( this.contains('block') ){
			this.setColors(colors, colors.length+1);
			var n = stripeCount > 2 ? Math.ceil( stripeCount / 2 ) / stripeCount : 0.5,
				w = horizontal ? 0.5 : n,
				h = horizontal ? n : 0.5;

			var positionRegExp = /block([L|R])([T|B])([W|H|N])/i,
				result = positionRegExp.exec(this.identifier),
				x = (result[1] === 'L' || result[3] === 'W') ? 0 : 1-w,
				y = (result[2] === 'T' || result[3] === 'H') ? 0 : 1-h;

			if( result[3] === 'W' ) w = 1;
			if( result[3] === 'H' ) h = 1;
			if (window.console) window.console.log(result,x,y);

			this.dr(x*width,y*height,width*w,height*h, colors[colors.length-1]);

			// OVERRIDE
			blockBox = {
				x:x*width,y:y*height,width:width*w,height:height*h
			}


		}

		if( this.contains('triangle') ){
			this.setColors(colors, colors.length+1);
			var positionRegExp = /triangle([L|R|T|B])/i,
				result = positionRegExp.exec(this.identifier),
				trixRexExp = /trix([1|2|3|4])/i,
				trixResult = 1 / parseInt( trixRexExp.exec(this.identifier)[1], 10);

			var lt = [0,0],
				rt = [1,0],
				lb = [0,1],
				rb = [1,1],
				triangle = [];

			if (window.console) window.console.log(trixResult);

			if( result[1] === 'L' ) triangle = [lt,lb,[trixResult, 0.5] ];
			if( result[1] === 'R' ) triangle = [rt,rb,[1-trixResult, 0.5]];
			if( result[1] === 'T' ) triangle = [lt,rt,[0.5, trixResult]];
			if( result[1] === 'B' ) triangle = [lb,rb,[0.5,1-trixResult]];

			this.ctx.beginPath();
			for(var i=0;i<3;i++){
				this.ctx[i===0 ? 'moveTo' : 'lineTo'](
					triangle[i][0] * width,triangle[i][1] * height
				)
			}
			this.ctx.closePath();
			this.ctx.fillStyle = colors[colors.length-1];
			this.ctx.fill();

		}


		if( this.contains('cross') ){
			this.setColors(colors, colors.length+1);
			var thickness = 0.18 * Math.min(blockBox.width, blockBox.height),
				x = blockBox.width * 0.5 + blockBox.x,
				y = blockBox.height * 0.5 + blockBox.y,
				d = Math.min(blockBox.width, blockBox.height) - thickness * 2


		
			// HORIZONTAL
			this.dr(
				x-d*0.5, 
				y-thickness*0.5,
				d,
				thickness,
				colors[colors.length-1]
			);
			// VERTICAL
			this.dr(
				x-thickness*0.5,
				y-d*0.5,
				thickness,
				d,
				colors[colors.length-1]
			)



		}

		if( this.contains('circ') ){
			this.setColors(colors, colors.length+1);
			var th = 0.14, x = 0.5, y = 0.5, r = .3;

			this.ctx.beginPath();
			this.ctx.arc(
				blockBox.x + x * blockBox.width, 
				blockBox.y + y * blockBox.height,
				r * Math.min(blockBox.width, blockBox.height),
				0,
				Math.PI * 2
			);
			this.ctx.closePath();
			this.ctx.fillStyle = colors[colors.length-1];
			this.ctx.fill();
		}

		if( this.contains('star') || this.contains('sun') ){
			this.setColors(colors, colors.length+1);
			var x = blockBox.x + blockBox.width * 0.5,
				y = blockBox.y + blockBox.height * 0.5
				min = Math.min(blockBox.width, blockBox.height),
				inner = min * 0.15,
				outer = min * 0.4,
				s = 5;

			if( this.contains('sun') ){
				s = 16;
				inner = min * 0.25;
				outer = min * 0.3;
			}

			this.star(x,y, s, inner, outer, colors[colors.length-1])
		}






		if (window.console) window.console.log(this.identifier, colors);
		canvas.title = this.identifier;
		return canvas;
	}



	return FWF;

});