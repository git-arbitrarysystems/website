Module.export({
	requires:[
		{url:'/modules/module/preloader/preloader.html', id:'html'},
		'/modules/module/preloader/preloader.css',
		'/shared/polyfills/classList.js',
		'/shared/dom/appendHTMLString.js'
	]
}, function(){
	
	'use strict'

	function Preloader(options){
		
		this.greet();

		this.options = {
			hideDelay:1000
		}
		
		this.parentElement =  options && options.target ? options.target : document.getElementsByTagName('body')[0];
		dom.appendHTMLString( this.parentElement, Preloader.data.html );
		
		this.rootElement = document.getElementById('default_preloader');
		this.progressTextNode = document.getElementById('dpl_bar_label');
		this.progressBarNode = document.getElementById('dpl_bar_inner');
		this.progressBarErrorNode = document.getElementById('dpl_bar_inner_err');

		this.visible = false;

	}

	Preloader.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am Preloader');//, Preloader.data.html );
	}

	Preloader.prototype.hideTimeout;

	Preloader.prototype._visible;
	Object.defineProperty(Preloader.prototype, 'visible', {
		get:function(){
			return this._visible
		},
		set:function(value){
			if( value !== this._visible ){
				this._visible = value;
				//if( window.console ) console.log('Preloader.visible', value );
				if( value ){
					//this.rootElement.style.display = 'block';
					//this.parentElement.appendChild( this.rootElement );
					this.progressTextNode.style.display = 'block';
				}else{
					//this.rootElement.style.display = 'none';
					//this.parentElement.removeChild( this.rootElement );
					this.progressTextNode.style.display = 'none';
				}
			}
			
		}
	})


	Preloader.prototype.progress = function(progress, errors ){	

		var percentage = (progress*100).toFixed(2) + '%',
			errorPercentage = (errors*100).toFixed(2) + '%';

		this.progressTextNode.innerHTML = percentage;
		this.progressBarNode.style.width = percentage;
		this.progressBarErrorNode.style.width = errorPercentage;

		if( this.hideTimeout ) clearTimeout( this.hideTimeout );

		if( progress !== 1 ){

			this.visible = true;
			

		}else if( progress === 1 ){
			
			var self = this;
			//if( window.console ) console.log('Preloader.progress', 1);

			this.hideTimeout = setTimeout( function(){
				self.visible = false;
			}, this.options.hideDelay );

		}


	}


	return Preloader
})