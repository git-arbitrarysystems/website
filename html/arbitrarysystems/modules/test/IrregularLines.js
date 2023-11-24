Module.export({
	requires:[
		'/shared/pixi/4.8.2/pixi.js',
		'/shared/ResizeListener.js',
		'/modules/pixi/mixin/ApplicationOnOff.js',
		{module:'/modules/pixi/MiniApplication.js'}
	]
},function(){

	'use strict'

	function IrregularLines(options){
		
		var self = this;
		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0]
		
		this.options = options;

		modules.pixi.MiniApplication.call(this, options);
		ApplicationOnOff(options.target);


		

		this.abberations = [];
		this.time = 0;
		this.ySpace = 7;
		this.density = 7;
		options.target.appendChild( this.view );

		ResizeListener.get().addEventListener('resize', function(){
			self.updateBucket();
		}).nudge();


		this.ticker.add( this.update, this );

	}

	IrregularLines.prototype = Object.create( modules.pixi.MiniApplication.prototype );
	IrregularLines.prototype.constructor = IrregularLines;

	IrregularLines.prototype.updateBucket = function(){
		var width = this.view.offsetWidth,
			targetLength = Math.ceil(width/this.density)+1;

		while( this.abberations.length < targetLength ){
			this.abberations.push(0);
		}

		this.abberations.splice(targetLength);
		this.addLine();


	}

	IrregularLines.prototype.update = function(){
		if( this.options.target.on ){
			if( this.time % 1 === 0 ){
				this.addLine();
			}
			this.time++;
		}
		
		//if (window.console) window.console.log('update', this.abberations.length);
	}

	IrregularLines.prototype.addLine = function(){

		var c = this.abberations.length, i;

		this.minAbberation = 0;
		this.maxAbberation = 0;

		var graphic = this.stage.addChild( new PIXI.Graphics() );

		// graphic.lineStyle(1,0xff0000, 0.3);
		// graphic.moveTo(0,0);
		// graphic.lineTo(this.view.offsetWidth, 0)


		

		graphic.lineStyle(1,0x000000);
		graphic.moveTo(0, this.abberations[0]);
		for(i=1; i<c;i++){
			graphic.lineTo(i*this.density, this.abberations[i])
		}



		for( i=0;i<c;i++){
			this.abberations[i] += (Math.random()-0.5) * 2;
			this.minAbberation = Math.min( this.abberations[i], this.minAbberation );
			this.maxAbberation = Math.max( this.abberations[i], this.maxAbberation );
		}

		// DISTRIBUTE
		var l = this.stage.children.length;
		for(i=0;i<l;i++){

			//this.ySpace = ( this.maxAbberation - this.minAbberation ) * 0.2

			this.stage.children[i].y = this.view.offsetHeight * 1 - (l-i) * this.ySpace - this.maxAbberation;
			
			//this.stage.children[i].alpha = (i/(l*1.5) )

			if( i === 0 ){
				var bounds = this.stage.children[i].getBounds(true);
				//if (window.console) window.console.log(bounds);
				if( this.stage.children[i].y - bounds.height > this.view.offsetHeight ){
					//this.stage.removeChild( this.stage.children[i] )
					this.stage.children[i].destroy(true);
					l--;
					i--;
				}

			}

		}


		if( this.maxAbberation - this.minAbberation > this.view.offsetHeight ){
			this.abberations = [];
			this.updateBucket();
		}


		//if (window.console) window.console.log('addLine', this.stage.children.length);

	}

	return IrregularLines;

});