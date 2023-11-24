(function(){
	function ApplicationOnOff(htmlNode){

		var led = document.createElement('div'),
			r = 0.25,
			s = 0.25;

		led.style.position = 'absolute';
		led.style.width = (r*2) + 'em';
		led.style.height = (r*2) + 'em';
		led.style.left = (s) + 'em';
		led.style.top = (s) + 'em';
		led.style.borderRadius = (r) + 'em';
		led.style.backgroundColor = 'white';
		led.style.border = '1px solid black';
		led.style.zIndex = 100;
		led.style.boxSizing = 'border-box';

		htmlNode.appendChild( led );
		htmlNode.style.cursor = 'pointer';

		function draw(color){
			led.style.backgroundColor = color;
		}


		Object.defineProperty(htmlNode, 'on', {
			enumerable:true,
			get:function(){
				return this._on;
			},
			set:function(value){
				this._on = value;
				//if( window.console ) console.log('ApplicationOnOff', htmlNode.on );
				draw(value ? 'black' : 'white')
			}
		});

		htmlNode.on = false;
		

		htmlNode.addEventListener('click', function(){
			htmlNode.on = !htmlNode.on;
		});
	


		






	}

	window.ApplicationOnOff = ApplicationOnOff;

})();