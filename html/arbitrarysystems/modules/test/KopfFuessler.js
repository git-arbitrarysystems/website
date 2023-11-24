Module.export({
	requires:[
		'/shared/jquery/jquery-3.3.1.min.js',
		'/shared/color-0.5.0.js',
		'/shared/ResizeListener.js',
	]
}, function(){
	function KopfFuessler(ops){

		if( ops === undefined ) ops = {};
		if( ops.fill === undefined ) ops.fill = 'rand';
		if( ops.line === undefined ) ops.line = 'rand';
		if( ops.target === undefined ) ops.target = document.getElementsByTagName('body')[0];


		var __defaults = {

			scale:0.5,
			border:1,
			symrand:true,
			fill:'#fff',
			line:'#000',
			head:{
				w:400,	// WIDTH
				h:400,	// HEIGHT
				mw:50,	// MIN-WIDTH
				mh:50, 	// MIN-HEIGHT

				round:true,
				sym:true // HEIGHT  === WIDTH

			},
			eye:{

				fill:null,
				line:null,

				sym:{
					w:true,
					h:true,
					x:true,
					y:true,

					round:{
						left:true,
						right:true
					}
				},

				w:0.3,
				h:0.3,
				mw:0.1,
				mh:0.1,

				y:0.5, 	// MAX REL VERTICAL POS
				my:0.2 	// MIN

			},
			mouth:{

				sym:true,

				w:1,
				mw:0.2,

				y:0.9,
				my:0.1
			},
			leg:{

				sym:true,

				h:3,
				mh:0.125,

				w:0.5,
				mw:0.2
			}

		}

		ops = $.extend(true,{},__defaults,ops);

		function min_max_rand(min,max,round){
			var v = min + (max-min) * Math.random();
			if( round === true ) v = Math.round(v);
			return v;
		};

		function width_at_y(y){
			y -= ops.head.h * 0.5;
			var d = ops.head.w / ops.head.h
			return ( 2 * Math.sqrt( ops.head.h*ops.head.h*0.25 - y*y ) ) * d;
		}

		// SCALE BORDER
		ops.border = Math.ceil( ops.border * ops.scale );

		// MAIN COLORISATION
		if( ops.fill === 'rand' ) ops.fill = new Color().rand().hexString();
		if( ops.line === 'rand' ) ops.line = new Color().rand().hexString();

		if( ops.fill === 'negate' ) ops.fill = new Color(ops.line).negate().hexString();
		if( ops.line === 'negate' ) ops.line = new Color(ops.fill).negate().hexString();
		
		// EYE COLORISATION
		if( !ops.eye.fill ) ops.eye.fill = ops.line;
		if( !ops.eye.line ) ops.eye.line = ops.line;

		if( ops.eye.fill === 'rand' ) ops.eye.fill = new Color().rand().hexString();
		if( ops.eye.line === 'rand' ) ops.eye.line = new Color().rand().hexString();
		if( ops.eye.fill === 'negate' ) ops.eye.fill = new Color(ops.eye.line).negate().hexString();
		if( ops.eye.line === 'negate' ) ops.eye.line = new Color(ops.eye.fill).negate().hexString();

		// RANDOMIZE SYMETRY BOOLEANS
		if( ops.symrand ){

			ops.head.round = ( Math.random() < 0.5 );
			ops.head.sym = ( Math.random() < 0.5 );
			
			ops.mouth.sym = ( Math.random() < 0.5 );
			
			ops.eye.sym.x = ( Math.random() < 0.5 );
			ops.eye.sym.y = ( Math.random() < 0.5 );
			ops.eye.sym.w = ( Math.random() < 0.5 );
			ops.eye.sym.h = ( Math.random() < 0.5 );

			ops.eye.sym.round.left = ( Math.random() < 0.5 );
			ops.eye.sym.round.right = ( Math.random() < 0.5 );

			ops.leg.sym = ( Math.random() < 0.5 );
		}

		// RANDOM HEAD SIZE // THIS IS THE BASIS OF ALL SZES
		ops.head.w = min_max_rand(ops.head.mw,ops.head.w,true) * ops.scale;
		ops.head.h = ops.head.sym ? ops.head.w : min_max_rand(ops.head.mh,ops.head.h,true) * ops.scale;


		// LEGS
		var lh = min_max_rand(ops.leg.mh,ops.leg.h,false) * ops.head.h + ops.head.h
		var llw = min_max_rand(ops.leg.mw * ops.head.w,ops.leg.w * ops.head.w,true);
		var rlw = ops.leg.sym ? llw : min_max_rand(ops.leg.mw * ops.head.w,ops.leg.w * ops.head.w,true);



		var legs = $('<div />').css({
			position:'relative',
			//background:'red',
			width:ops.head.w,
			height:lh
		}).append(
			// LEFT LEG
			$('<div/>').css({
				position:'absolute',
				'border-right':ops.border+'px solid ' + ops.line,
				'border-bottom':ops.border+'px solid ' + ops.line,
				width:llw,
				height:lh - ops.head.h * 0.5 - ops.border,
				top:ops.head.h * 0.5,
				left:0
			}),
			// RIGHT LEG
			$('<div/>').css({
				position:'absolute',
				'border-left':ops.border+'px solid '+ops.line,
				'border-bottom':ops.border+'px solid ' + ops.line,
				width:rlw,
				height:lh - ops.head.h * 0.5 - ops.border,
				top:ops.head.h * 0.5,
				right:0
			})
		);




		
		var head = $('<div/>').css({
			position:'absolute',
			overflow:'hidden',
			background:ops.fill,
			border:ops.border + 'px solid ' + ops.line,
			'box-sizing': 'border-box',
			width:ops.head.w,
			height:ops.head.h,
			'border-radius': ops.head.round ? '50% / 50%' : ''
		}).appendTo(legs);

		//  EYE
		var e = $('<div/>').css({
			position:'absolute',
			border:ops.border+'px solid ' + ops.eye.line,
			'box-sizing': 'border-box',
			background:ops.eye.fill,
			'border-radius':'50% / 50%'
		});

		// EYE WIDTH
		var lw = min_max_rand(ops.eye.mw,ops.eye.w,false) * ops.head.w * ops.scale;
		var rw = ops.eye.sym.w ? lw : min_max_rand(ops.eye.mw,ops.eye.w,false) * ops.head.w * ops.scale;

		// EYE HEIGHT
		var lh = ops.eye.sym.round.left ? lw : min_max_rand(ops.eye.mh,ops.eye.h,false) * ops.head.h * ops.scale;
		var rh = ops.eye.sym.h ? lh : ops.eye.sym.round.right ? rw : min_max_rand(ops.eye.mh,ops.eye.h,false) * ops.head.h * ops.scale;

		// EYE Y-OFFSET
		var ly = Math.round( min_max_rand(ops.eye.my,ops.eye.y,false) * ops.head.h );
		var ry = ops.eye.sym.y ? ly : Math.round( min_max_rand(ops.eye.my,ops.eye.y,false) * ops.head.h );

		// EYE X-OFFSET
		var localWidth = ops.head.round ? width_at_y(ly) - ops.border * 2 : ops.head.w;
		var lx = ( ops.head.w - localWidth ) * 0.5 + Math.random() * ( localWidth * 0.5 - lw );

		var localWidth = ops.head.round ? width_at_y(ly) - ops.border * 2 : ops.head.w;
		var rx =  ops.eye.sym.x ? lx : ( ops.head.w - localWidth ) * 0.5 + Math.random() * ( localWidth * 0.5 - rw );


		// APPEND LEFT / RIGHT
		head.append(
			e.clone().css({
				width:lw,
				height:lh,
				left:lx,
				top:ly
			}),
			e.clone().css({
				width:rw,
				height:rh,
				right:rx,
				top:ry
			})
		);

		// MOUTH

		var offset = Math.max( lh + ly , rh + ry );
		var my = offset + Math.round( min_max_rand(ops.mouth.my,ops.mouth.y,false) * (ops.head.h-offset-ops.border) );


		var localWidth = ops.head.round ? width_at_y(my) - ops.border * 2 : ops.head.w;;
		var mw = min_max_rand(ops.mouth.mw,ops.mouth.w,false) * localWidth;
		var mx = (ops.head.w - localWidth) * 0.5 + ( ops.mouth.sym ? 0.5 : Math.random() ) * (localWidth-mw);
		

		

		$('<div/>').css({
			position:'absolute',
			background:ops.line,
			height:ops.border,
			width:mw,
			left:mx,
			top:my
		}).appendTo( head );


		


		var self = this;
		self.target = $(ops.target);
		self.legs = legs;
		function resizeWrapper(){
			self.resize();
		}

	

		

		self.target.append(legs)
		self.target.css({
			'overflow':'hidden',
			'cursor':'pointer'
		});

		self.target.on('click', function(){
			self.target.off('click');
			self.target.empty();
			ResizeListener.get().removeEventListener( 'resize', resizeWrapper );
			new KopfFuessler({target:ops.target})
		});

		resizeWrapper();
		ResizeListener.get().addEventListener( 'resize', resizeWrapper ).nudge();



		
			

		return legs;
		
	}


	KopfFuessler.prototype.resize = function(){
		var scale = Math.min( this.target.height() / this.legs.height(), this.target.width() /  this.legs.width(), 1 ) * 0.9;
		this.legs.css({
			'transform':'scale('+scale+') translate(-50%, -50%)',
			'transform-origin':'0 0',
			'position':'absolute',
			'left':'50%',
			'top':'50%'
		})
		
	}





	return KopfFuessler;
})




