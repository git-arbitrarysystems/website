Module.export( function(){

	function InfiniteScroller(options){

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];

		var container = document.createElement('div');
		with( container.style ){
			position = 'relative';
			width = '100%';
			height = '500px';
			backgroundColor = '#ffdddd';
			overflow = 'hidden';
		}

		var boxes = [
			document.createElement('div'),
			document.createElement('div')
		];

		for(var i=0;i<boxes.length;i++){

			boxes[i].innerHTML = '<h3>' + i + '</h3>'

			with( boxes[i].style ){
				width = '100%';
				height = '100%';
				position = 'absolute',
				left = (i*100) + '%';
				backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
			}
			container.appendChild(boxes[i]);
		}

		var ts = 0;
		function animate(){
			requestAnimationFrame( function(){
				animate();
			});

			var a = 0.9,
				aa = 1-a,
				d = container.scrollLeft * a + ts * aa;
			container.scrollLeft = d;

		}

		animate();

		container.addEventListener('click', function(){
			//container.scrollLeft += 100;
			ts += 500;//container.offsetWidth;
		})


		container.addEventListener('scroll', function(event){
			var sl = container.scrollLeft,
				sw = container.clientWidth;

			if( sl >= sw ){

				event.preventDefault()
				event.stopPropagation();

				container.scrollLeft -= sw;
				ts -= sw;
				boxes.push( boxes.splice(0,1)[0] );
				for(var i=0;i<boxes.length;i++){
					boxes[i].style.left = i*100 + '%'
				}

				boxes[1].style.backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
			}


			//if (window.console) window.console.log(container.scrollLeft, container.clientWidth);
		})


		options.target.appendChild(container);


	}

	return InfiniteScroller;

})