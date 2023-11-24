(function(){

	'use strict'


	/**
	 * @author mrdoob / http://mrdoob.com/
	 * usage: Object.assign( Car.prototype, EventDispatcher.prototype );
	 */
	function EventDispatcher(){}Object.assign( EventDispatcher.prototype,{addEventListener:function(i,t){void 0===this._listeners&&(this._listeners={});var e=this._listeners;return void 0===e[i]&&(e[i]=[]),-1===e[i].indexOf(t)&&e[i].push(t),this},hasEventListener:function(i,t){if(void 0===this._listeners)return!1;var e=this._listeners;return void 0!==e[i]&&-1!==e[i].indexOf(t)},removeEventListener:function(i,t){if(void 0!==this._listeners){var e=this._listeners[i];if(void 0!==e){var s=e.indexOf(t);-1!==s&&e.splice(s,1)}return this}},dispatchEvent:function(i){if(void 0!==this._listeners){var t=this._listeners[i.type];if(void 0!==t){i.target=this;for(var e=t.slice(0),s=0,n=e.length;s<n;s++)e[s].call(this,i)}return this}}});


	function KeyboardListener(){

		if( KeyboardListener.instance !== undefined ){
			throw new Error('KeyboardListener.instance is allready defined');
			return;
		}

		var self = this;

		window.addEventListener('keydown', function(event){
			self.onKeyboardEvent(event);
		});
		window.addEventListener('keyup', function(event){
			self.onKeyboardEvent(event);
		});

		KeyboardListener.instance = undefined;
		KeyboardListener.instance = this;
	}

	Object.assign( KeyboardListener.prototype, EventDispatcher.prototype);

	
	KeyboardListener.prototype.map = {};
	KeyboardListener.prototype.onKeyboardEvent = function(event){
		var value = (event.type === 'keydown');
		if( value !== this.map[event.code] ){
			this.map[event.code] = value;
			this.dispatchEvent({
				type:'change',
				code:event.code,
				value:value
			});
		}
		
	}

	KeyboardListener.get = function(){
		if( KeyboardListener.instance ) return KeyboardListener.instance;
		return new KeyboardListener();
	}

	

	window.KeyboardListener = KeyboardListener;


})()