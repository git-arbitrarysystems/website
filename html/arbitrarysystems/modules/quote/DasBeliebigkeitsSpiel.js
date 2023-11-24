( function(){

	var element = document.getElementById('ende-dice'),
		chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÖÄÜß ',
		diceCount = 30,
		dice = [],
		elements = [];

	with( element.style ){
		cursor = 'pointer';
		textAlign = 'center';
		padding = '2em 1em 1em 1em';
		boxSizing = 'border-box';
	}

	for(var i=0;i<diceCount;i++){
		dice.push([]);
		for(var j=0;j<6;j++){
			dice[i].push( chars.charAt( Math.floor(Math.random() * chars.length) ) );
		}

		var div = document.createElement('div');

		element.appendChild(div);
		

	}

	function roll(){
		var min = 10,
			max = min + Math.floor( ( diceCount - min ) * Math.random() ),
			word;

		if( Math.random() < 0.1 ){
			word = ['Spinatkrampf', 'Bürstenwürste', 'Kragenlack' ][ Math.floor(Math.random() * 3) ]
			max = word.length;
		}

		for(var i=0;i<diceCount;i++){
			if(i<max){

				var char = dice[i][Math.floor(Math.random() * 6)];
				if( word ) char = word.charAt(i).toUpperCase();

				element.children[i].innerHTML = char;
				if( element.children[i].innerHTML === ' ' )element.children[i].innerHTML = '&nbsp;'



				with( element.children[i].style ){
					display = 'inline-block';
					margin = '0.2em';
					boxSizing = 'border-box';
					border = '1px solid black';
					backgroundColor = '#fff';
					borderRadius = '0.2em';
					textAlign = 'center';
					lineHeight = '1.4em';
					width = '1.4em';
					height = '1.4em';
					opacity = 1;
				}

				
				


			}else{
				element.children[i].style.display = 'none';
			}
		}

		//if( window.console ) console.log('roll', word);
		if( !word ){
			Array.prototype.slice.call(element.children)
				.map(function (x) { return element.removeChild(x); })
				.sort(function (x, y) { return Math.random()-0.5; })
				.forEach(function (x) { element.appendChild(x); });

		}
		
	}


	roll();
	element.addEventListener('click', function(){ roll(); });



})()