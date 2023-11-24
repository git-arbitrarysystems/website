(function(){

	'use strict'


	/**
	 * @author mrdoob / http://mrdoob.com/
	 * usage: Object.assign( Car.prototype, EventDispatcher.prototype );
	 */
	function EventDispatcher(){}Object.assign(EventDispatcher.prototype,{addEventListener:function(i,t){void 0===this._listeners&&(this._listeners={});var e=this._listeners;return void 0===e[i]&&(e[i]=[]),-1===e[i].indexOf(t)&&e[i].push(t),this},hasEventListener:function(i,t){if(void 0===this._listeners)return!1;var e=this._listeners;return void 0!==e[i]&&-1!==e[i].indexOf(t)},removeEventListener:function(i,t){if(void 0!==this._listeners){var e=this._listeners[i];if(void 0!==e){var s=e.indexOf(t);-1!==s&&e.splice(s,1)}return this}},dispatchEvent:function(i){if(void 0!==this._listeners){var t=this._listeners[i.type];if(void 0!==t){i.target=this;for(var e=t.slice(0),s=0,n=e.length;s<n;s++)e[s].call(this,i)}return this}}});


	function ResizeListener(){

		if( ResizeListener.instance !== undefined ){
			throw new Error('ResizeListener.instance is allready defined');
			return;
		}

		var self = this;

		window.addEventListener('resize', function(event){
			self.onWindowResize();
		});

		ResizeListener.instance = undefined;
		ResizeListener.instance = this;
	}

	Object.assign( ResizeListener.prototype, EventDispatcher.prototype);

	ResizeListener.prototype.nudge = function(){
		this.onWindowResize();
		return this;
	}

	ResizeListener.delay = 150

	ResizeListener.prototype.onWindowResize = function(){

		var self = this;

		window.clearTimeout(self.timeout);
		self.timeout = setTimeout( function(){
			self.dispatchEvent({
				type:'resize',
				width:window.innerWidth,
				height:window.innerHeight
			});
		}, ResizeListener.delay );
	}

	ResizeListener.get = function(){
		if( ResizeListener.instance ) return ResizeListener.instance;
		return new ResizeListener();
	}

	ResizeListener.nudge = function(){
		return ResizeListener.get().nudge();
	}

	window.ResizeListener = ResizeListener;


})()