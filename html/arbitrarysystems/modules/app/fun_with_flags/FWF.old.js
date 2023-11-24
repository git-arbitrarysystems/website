Module.export({
	requires:[
	'/modules/app/fun_with_flags/fwf.css'
	]
},
	function(){

	function FWF(options){
		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0]

		this.options = options;
		if( window.console ) console.log('FWF', options, FWF.ratio, FWF.layout );

		for(var i=0;i<50;i++){
			if( window.console ) console.log('__flag'+i+'__');
			options.target.appendChild(
				this.ratio().outer
			)
		}
	}

	FWF.prototype.ratio = function(){

		
		
		// SELECT RATIO
		var ratio,
			limit = Math.random(),
			sum = 0,
			i;
		for(i=0;i<FWF.ratio.length;i++){
			if(sum <= limit){ ratio = FWF.ratio[i].ratio }
			sum += FWF.ratio[i].usage;	
		}

		if( window.console ) console.log('FWF.ratio', ratio.toFixed(7) );

		var outer = document.createElement('div'),
			ratio_element = document.createElement('div'),
			content = document.createElement('div');

		outer.className = 'flag';
		ratio_element.className = 'ratio';
		content.className = 'content';

		ratio_element.style.paddingTop = (ratio*100).toFixed(7) + '%';
		content.title = 'r' + Math.floor(ratio*100)

		outer.appendChild(ratio_element);
		outer.appendChild(content);

		this.layout(content, ratio);

		return {
			outer:outer,
			ratio:ratio,
			content:content
		}
	}

	FWF.prototype.randomCssColor = function(){
		var cs =  Math.floor(Math.random()*16777215).toString(16);
		while( cs.length < 6 ) cs = '0' + cs;
		return '#' + cs;
	}

	FWF.prototype.layout = function(content_element){
		var layout = FWF.layout[ Math.floor(Math.random()*FWF.layout.length) ];
		if( window.console ) console.log('FWF.layout', layout.id);

		content_element.title = content_element.title + '-' + layout.id;

		layout.rows = layout.rows || 1;
		layout.cols = layout.cols || 1;

		if( Array.isArray(layout.rows) ) layout.rows = layout.rows[ Math.floor(Math.random() * layout.rows.length) ]
		if( Array.isArray(layout.cols) ) layout.cols = layout.cols[ Math.floor(Math.random() * layout.cols.length) ]

		layout.matchOuter = layout.matchOuter || false;
		layout.matchEven = layout.matchEven || false;
		layout.matchOdd = layout.matchOdd || false;
		layout.alternate = layout.alternate || false;
		layout.arrow = layout.arrow || false;

		var blocks = layout.rows * layout.cols,
			x,y,index,
			div,color,
			extremityColor,evenColor,oddColor, colors = [];
		for(x=0;x<layout.cols;x++){
			for(y=0;y<layout.rows;y++){

				index = x + y * layout.cols;

				div = document.createElement('div');
				div.className = 'block';

				div.style.position = 'absolute';
				div.style.left =  ( x * (100/layout.cols) ).toFixed(7) + '%';
				div.style.top =   ( y * (100/layout.rows) ).toFixed(7) + '%';
				div.style.width = (		(100/layout.cols) ).toFixed(7) + '%';
				div.style.height =(		(100/layout.rows) ).toFixed(7) + '%';

				color = this.randomCssColor();
				if( layout.matchOuter ){
					if( layout.cols === 1 && y === 0 ) extremityColor = color;
					if( layout.cols === 1 && y === layout.rows-1 ) color = extremityColor;
					if( layout.rows === 1 && x === 0 ) extremityColor = color;
					if( layout.rows === 1 && x === layout.cols-1 ) color = extremityColor; 
				}

				if( layout.matchEven && !evenColor ){
					if( index % 2 === 0 ) evenColor = color;
				}
				if( layout.matchOdd && !oddColor ){
					if( index % 2 === 1 ) oddColor = color;
				}
				if( layout.matchEven && index%2 === 0 ) color = evenColor;
				if( layout.matchOdd  && index%2 === 1 ) color = oddColor;


				if( (layout.alternate || layout.alternateFirst || layout.alternateSecond ) && colors.length < 2 ){
					colors.push(color);
				}
				if( layout.alternate && colors.length >=2 ){
					color = colors[(x+y)%2]
				}
				if( layout.alternateFirst && colors.length >= 2 && (x+y)%2 === 0 ){
					color = colors[(x+y)%2]
				}
				if( layout.alternateSecond && colors.length >= 2 && (x+y)%2 === 1 ){
					color = colors[(x+y)%2]
				}



				
				if( window.console ) console.log('color', x,y,color);
				div.style.backgroundColor = color;

				content_element.appendChild(div);

			}
		}


		if( layout.arrow ){
			var arrow = document.createElement('div'),
				color = this.randomCssColor();

			content_element.style.overflow = 'hidden'

			arrow.style.position = 'absolute'
			arrow.style.width = '50%';
			arrow.style.paddingTop = '100%';
			arrow.style.left = 0;
			arrow.style.top = '50%'
			arrow.style.height = '0';
			
			arrow.style.backgroundColor = color;
			arrow.style.transformOrigin = '50% 50%'
			arrow.style.transform = 'rotate(45deg)'


			content_element.appendChild(arrow);

		}




		

	}




	/* 


		DEFINE POSSIBLE LAYOUTS


	*/
	FWF.layout = [
		 {id:'dutch' ,rows:3}
		,{id:'french',cols:3}
		,{id:'dutch-matchOuter' ,rows:3, matchOuter:true}
		,{id:'french-matchOuter',cols:3, matchOuter:true}
		//,{id:'2x2',cols:2, rows:2}
		,{id:'2x2-alternate',cols:2, rows:2, alternate:true}
		,{id:'striped-alternate', rows:[9,11,13], alternate:true}
		,{id:'arrow', arrow:true}
		
		//,{id:'2x2-alternateFirst',cols:2, rows:2, alternateFirst:true}
		//,{id:'2x2-alternateSecond',cols:2, rows:2, alternateSecond:true}
		//,{id:'3x3-alternate',cols:3, rows:3, alternate:true}
		
	]



	/*

		MAKE A LIST OF RATIO'S
		https://en.wikipedia.org/wiki/List_of_aspect_ratios_of_national_flags

	*/
	FWF.ratio = [
		{ratio:2/3, usage:89},
		{ratio:1/2, usage:54},
		5/7,
		7/10,
		5/8,
		3/5,
		13/15,
		15/22,
		7/10,
		16/25,
		3/4,
		28/37
		// etc
	]

	var i,
		assigned = 0,
		unassigned = 0,
		max = 195;
	for( i=0;i<FWF.ratio.length;i++ ){
		if( typeof FWF.ratio[i] === 'number' ) FWF.ratio[i] = {ratio:FWF.ratio[i], usage:0};
		if( FWF.ratio[i].usage === 0 ){
			unassigned ++;
		}else{
			assigned += FWF.ratio[i].usage;
		}
	}
	for( i=0;i<FWF.ratio.length;i++ ){
		if( FWF.ratio[i].usage === 0 ){
			FWF.ratio[i].usage = ( (max-assigned) / unassigned );
		}
		FWF.ratio[i].usage /= max;
	}


	return FWF;

});