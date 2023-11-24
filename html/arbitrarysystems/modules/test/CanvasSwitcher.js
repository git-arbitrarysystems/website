Module.export({requires:[
		'/shared/pixi/4.8.2/pixi.js',
		'/shared/ResizeListener.js'
]}, function(){
	function CanvasSwitcher(options){

		var self = this;

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];


		var note = document.createElement('h1');
			note.innerHTML = 'It works (IMG+self.renderer.view.toDataURL), but it seems simply using a bunch of canvasrenderers might be faster',
			container = document.createElement('div');
		

		options.target.appendChild( container );
		
		


		this.renderer = new PIXI.autoDetectRenderer({
			clearBeforeRender:false
		});

		this.renderer.transparent = true;
		this.renderer.resize(300,200);

		
		container.appendChild(note);

		var a = 20;

		this.list = [];
		for( var i=0;i<a;i++){
			var canvas = document.createElement('img');
			this.list.push(canvas);

			var w = 10 + Math.floor( Math.random() * 300 ),
				h = 10 + Math.floor( Math.random() * 300 )

			canvas.style.width = w+'px';
			canvas.style.height = h+'px';
			container.appendChild( canvas );

			canvas.addEventListener('click', function(){
				self.select(this);
			});

			if( i===0 ) self.select(canvas);

		}
		



		this.ticker = new PIXI.ticker.Ticker();
		this.ticker.start();


		
		this.stage = new PIXI.Container();
		var white = this.stage.addChild( new PIXI.Sprite(PIXI.Texture.WHITE) )

		this.ticker.add( function(){
			self.renderer.render(self.stage);

			du = self.renderer.view.toDataURL();

			white.anchor.set(0.5);
			white.x = Math.random() * self.renderer.view.width;
			white.y = Math.random() * self.renderer.view.height;
			white.width = Math.random() * self.renderer.view.width;
			white.height = Math.random() * self.renderer.view.height;
			white.alpha = 1;//Math.random();
			white.tint = Math.floor( Math.random() * 0xffffff );

			for( var i=self.list.length-1;i>=0;i--){
				self.list[i].setAttribute('src', du );
			}
			

			//if( window.console ) console.log(self.selected);
			//debugger;

		});



		ResizeListener.get().nudge();

	}

	CanvasSwitcher.prototype.select = function(canvas){
		if( this.selected ) this.selected.style.border = '';
		this.renderer.resize(canvas.offsetWidth, canvas.offsetHeight);
		this.selected = canvas;
		
		if( this.selected ) this.selected.style.border = '10px solid red';


	}

	return CanvasSwitcher;
})