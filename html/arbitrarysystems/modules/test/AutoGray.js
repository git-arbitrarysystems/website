Module.export( function(){

	function div(alt){
		var e = document.createElement('div');
		e.style.position = 'absolute';
		e.style.left = alt ? '10%' : '30%'
		e.style.top = alt ? '10%' : '25%'
		e.style.width = '60%';
		e.style.height = '50%';
		e.style.backgroundColor = '#000000';
		e.style.opacity = alt ? 1 : 0.5
		return e;
	}

	var a = div(true),
		b = div(false);


	function span(int){
		var e = document.createElement('span');
		with(e.style){
			width = '1em';
			height = '1em';
			display = 'inline-block';
			backgroundColor = '#ffffff'
		}

		if( int === 1 ) e.innerHTML = '+'
		if( int === 3 ) e.innerHTML = '='
		if( int === 2 ) e.style.opacity = 0.5;

		return e;
	}

	var spans = document.createElement('div');
	with(spans.style){
		position = 'absolute';
		textAlign = 'center';
		bottom = '0.5em'
		height = '1em';
		top = 'auto';
	}
		spans.appendChild( span(0) );
		spans.appendChild( span(1) );
		spans.appendChild( span(2) );
		spans.appendChild( span(3) );
		spans.appendChild( span(4) );


	function AutoGray(options){

		var self = this;

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];

		options.target.appendChild(a);
		options.target.appendChild(b);
		options.target.addEventListener('click', function(){
			self.shuffle()
		})

		options.target.appendChild(spans);
		options.target.style.cursor = 'pointer';

		this.shuffle();

	}


	AutoGray.prototype.shuffle = function(){
		var ca = Math.floor( Math.random()*0xffffff ),
			cb = 0xffffff - ca;


		var a16 = ca.toString(16);
		while( a16.length < 6 ) a16 = '0' + a16;

		var b16 = cb.toString(16);
		while( b16.length < 6 ) b16 = '0' + b16;

		
		var ta,tb,tc,i, c16 = '';
		for( i=0;i<6;i++){
			ta = parseInt( a16.charAt(i), 16 );
			tb = parseInt( b16.charAt(i), 16 );
			tc = Math.floor( (ta+tb)*0.5 ).toString(16)

			//if( window.console ) console.log(ta,tb, tc);
			c16 += tc;
		}


		//if( window.console ) console.log(a16,b16);

		a.style.backgroundColor = '#' + a16;
		b.style.backgroundColor = '#' + b16;

		spans.children[0].style.backgroundColor = '#' + a16;
		spans.children[2].style.backgroundColor = '#' + b16;
		spans.children[4].style.backgroundColor = '#' + c16;


	}

	return AutoGray;

})