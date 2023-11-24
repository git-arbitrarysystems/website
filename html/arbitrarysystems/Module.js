(function(){

	'use strict'

	/**
	* Object.assign Polyfill
	*/
	"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(n[c]=o[c])}return n},writable:!0,configurable:!0});

	/**
	* @author mrdoob / http://mrdoob.com/
	* usage: Object.assign( Car.prototype, EventDispatcher.prototype );
	*/
	function EventDispatcher(){}Object.assign(EventDispatcher.prototype,{addEventListener:function(i,e){void 0===this._listeners&&(this._listeners={});var t=this._listeners;void 0===t[i]&&(t[i]=[]),-1===t[i].indexOf(e)&&t[i].push(e)},hasEventListener:function(i,e){if(void 0===this._listeners)return!1;var t=this._listeners;return void 0!==t[i]&&-1!==t[i].indexOf(e)},removeEventListener:function(i,e){if(void 0!==this._listeners){var t=this._listeners[i];if(void 0!==t){var s=t.indexOf(e);-1!==s&&t.splice(s,1)}}},dispatchEvent:function(i){if(void 0!==this._listeners){var e=this._listeners[i.type];if(void 0!==e){i.target=this;for(var t=e.slice(0),s=0,n=t.length;s<n;s++)t[s].call(this,i)}}}});

	/**
	* @author jfs / http://arbitrarysystems.com/
	*/
	function getByKey(i,n){void 0===n&&(n=window);var o,t=i.split("."),e=t.length;for(o=0;o<e;o++){if(void 0===n[t[o]])return;n=n[t[o]]}return n}
	function setByKey(i,n,o){void 0===o&&(o=window);var t,e=i.split("."),r=e.length,d=e[r-1];for(t=0;t<r-1;t++)void 0===o[e[t]]&&(o[e[t]]={}),o=o[e[t]];o[d]=n}


	var _debugModule = false,
		_debugFileLoader = false,
		_debugModuleRequirement = false,
		_debugstyle = function(state){
			if( state === 'error' ) return 'background-color:lightcoral;color:white;padding:0 5em;'
			return '';
		}

	
	/*
	*
	*
	* Module
	*
	*
	*/
	function Module(url, ready, error){
		
		this.created = Date.now();
		this.data = {};
		

		if( typeof ready === 'function' ) this.addEventListener('ready', ready );
		if( typeof error === 'function' ) this.addEventListener('error', error );

		if( url ){
			this.url = url;
			this.load();
		}
		
	}

	// EVENTDISPATCHER
	Object.assign( Module.prototype, EventDispatcher.prototype );

	// MODULE STATE [undefined, ready, error]
	Module.prototype._state;
	Object.defineProperty(Module.prototype, 'state', {
		get:function(){
			return this._state
		},
		set:function(value){
			this._state = value;
			if( window.console && (_debugModule || value === 'error') ) console.log('%cModule('+this.url+') => ' + value.toUpperCase(), _debugstyle(value) );
			this.dispatchEvent({type:value});

			// NUDGE PROGRESS  STATE
			FileLoader.progress();


		}
	});


	// MODULE DATA, SHOULD CONTAIN ALL LOADED REQUIREMENTS
	Module.prototype.data;

	// MODULE LOADER [FileLoader]
	Module.prototype.loader;


	Module.prototype.load = function(){
		
		var self = this;

		if( window.console && _debugModule ) console.log('%cModule.prototype.load:' + this.url, 'background-color:lightgreen;');
		
		// NUDGE PROGRESS  STATE
		FileLoader.progress();

		this.loader = FileLoader.load(this.url, function(){
			if( _pending ){
				// GET AND CLEAR PENDING
				var meta = {};
				for( var s in _pending ) meta[s] = _pending[s];
				self.meta = meta;
				_pending = undefined;
			}else{
				self.state = 'error';
			}
		}, function(){
			self.state = 'error';
		});

	}


	Module.prototype._meta;
	Object.defineProperty(Module.prototype, 'meta', {
		get:function(){
			return this._meta
		},
		set:function(value){
			if( window.console && _debugModule ) console.log('Module.meta', value);
			this._meta = value;
			this.requires = this.meta.requires;
		}
	});


	Module.prototype._requires = [];
	Object.defineProperty(Module.prototype, 'requires', {
		get:function(){
			return this._requires
		},
		set:function(value){
			this._requires = [];

			if( window.console && _debugModule ) console.log('Module.requires', value);

			// NORMALIZE TO ARRAY
			if( Array.isArray(value) ){
				this._requires = value;
			}else if( typeof value === 'object' || typeof value === 'string' ){
				this._requires = [value];
			}

			if( this._requires.length === 0 ){
				this.construction();
			}else{
				
				var self = this,
					addedAllRequirements = false;

				for(var i=0;i<this._requires.length;i++){
					this._requires[i] = new ModuleRequirement(this, this._requires[i], function(){
						if( addedAllRequirements ) self.testRequirements()
					}, function(){
						self.state = 'error';
					});

					
					//if (window.console) window.console.log('requirement', i,this._requires[i].state, this._requires[i] );
				}

				addedAllRequirements = true;
				this.testRequirements();

			}
		}
	});

	Module.prototype.testRequirements = function(){
		// CHECK ALL REQUIREMENTS
		for(var i=this.requires.length-1;i>=0;i--){
			if( this.requires[i].state !== 'ready' ) return;
			//if( window.console && _debugModule ) console.log('Module.testRequirements', this.url,  i,this.requires[i].url, this.requires[i].state );
		}
		this.construction();
	}


	Module.prototype.construction = function(){

		if( window.console && _debugModule ) console.log('Module.construction', this );
		
		// THIS IS AN AMPTY MODULE, USED FOR LOADING MULTIPLE MODULE FILES AT ONCE
		if( !this.meta.fn ){
			this.state = 'ready';
			return;
		}

		this.scope = this.url.replace(/\.min\.js|\.js/, '').replace(/\\|\//g, '.').replace(/^\./, '');

		// HANDLE RELATIVE URL'S
		if( this.scope.charAt(0) === '.' ) this.scope = this.scope.substr(1);
		



		this.class = this.meta.fn();
		this.class.module = this;
		this.class.data = this.data;

		setByKey(this.scope, this.class );
		if( getByKey(this.scope) === this.class ){
			this.state = 'ready';
		}else{
			this.state = 'error';
		}




	}

	// MODULES REGISTRY
	var _modules = {};

	// PENDING MODULE ( SET ON EXPORT )
	var _pending;

	// STATIC
	Module.root = '';

	// XHRPRELOAD, USES PRELOADING OF JAVASCRIPT AND CSS FILES BEFORE INJECTING THE SCRIPTS
	Module.xhrPreload = false;

	// SET A PRELOADER
	Object.defineProperty(Module, 'preloader', {
		get:function(){
			return this._preloader;
		},
		set:function(value){
			this._preloader = value;		
		}
	});

	// SET A DASHBOARD
	Object.defineProperty(Module, 'dashboard', {
		get:function(){
			return this._dashboard;
		},
		set:function(value){
			this._dashboard = value;
		}
	});


	// GENERATE AN OVERVIEW OF ALL MODULES FOR THE DASHBOARD
	Object.defineProperty(Module, 'overview', {
		get:function(){
			var o = [],
				m,i,s,c,
				r;
			
			for( s in _modules ){
				m = _modules[s];
				o.push({	
					id:s,
					created:m.created,
					state:m.state,
					progress:m.loader.progress,
					requirements:[]
				});

				c = m.requires.length;
				for(i=0;i<c;i++){
					r = {
						id:m.requires[i].url,
						state:m.requires[i].state,
						progress:m.requires[i].loader ? m.requires[i].loader.progress : 0
					}
					o[o.length-1].requirements.push(r)
				}
			}

			o.sort( function(a,b){
				return a.created - b.created;
			});
			
			return o;
		}
	});






	Module.load = function(url, ready, error){


		// LOADING MULTIPLE MODULES
		if( Array.isArray(url) ){
			
			var requires = [];
			for( var i=url.length-1;i>=0;i--){
				requires.push({module:url[i]});
			}

			// CREATING AN EMPTY TEMP MODULE WITHOUT URL AND SUBSEQUENTLY WITHOUT LOADING
			var temp = new Module(undefined, ready, error);
			temp.meta = { requires:requires }
			
			return;
		}

		if( _modules[url] ){
	
			// MODULE EXISTS
			switch( _modules[url].state ){
				case 'ready':
					if( typeof ready === 'function' ) ready.call( _modules[url], {type:'ready', target:_modules[url]} );
					break;
				case 'error':
					if( typeof error === 'function' ) error.call( _modules[url], {type:'error', target:_modules[url]} );
					break;
				default:
					if( typeof ready === 'function' ) _modules[url].addEventListener('ready', ready );
					if( typeof error === 'function' ) _modules[url].addEventListener('error', error );
				break;
			}
		
		}else{

			// CREATE NEW MODULE
			_modules[url] = new Module(url, ready, error);

		}

		return _modules[url];

	}
	
	Module.export = function(meta, fn){
		_pending = {};
		if( typeof meta === 'function' ){
			_pending.fn = meta;
		}else{
			_pending.fn = fn;
			for( var s in meta ){
				_pending[s] = meta[s];
			}
		}

		if( window.console && _debugModule ) console.log('_pending:',_pending);

	}

	Module.debug = function(_module,_requirements,_fileLoader){
		_debugModule = ( typeof _module === 'boolean' ) ? _module : true;
		_debugModuleRequirement = ( typeof _requirements === 'boolean' ) ? _requirements : _debugModule;
		_debugFileLoader = ( typeof _fileLoader === 'boolean' ) ? _fileLoader : _debugModule;
		return Module;
	}


	window.Module = Module; 



	/*
	*
	*
	* ModuleRequirement
	*
	*
	*/
	function ModuleRequirement(module, object, ready, error){
	
		var self = this;

		if( typeof object === 'string' ) object = {url:object}

		this.url = object.module || object.url;
		this.id = object.id || this.url;
		this.test = object.test || function(){ return true };
		this.isModule = object.module ? true : false;
		this.async = typeof object.async === 'boolean' ? object.async : true;
		this.jsModule = typeof object.jsModule === 'boolean' ? object.jsModule : false;

		if( window.console ) console.log('ModuleRequirement.async', this.async, this.url, this.jsModule);

		if( typeof ready === 'function' ) this.addEventListener('ready', ready );
		if( typeof error === 'function' ) this.addEventListener('error', error );

		// CALLBACK WRAPPERS
		var _ready = function(){
			if( self.test() ){
				module.data[self.id] = this.content;
				self.state = 'ready';
			}else{
				self.state = 'error';
			}
		}
		var _error = function(){ self.state = 'error'; }

		if( this.isModule ){
			this.loader = Module.load(this.url, _ready, _error );
		}else{
			this.loader = FileLoader.load( this.url, _ready, _error, this.async,this.jsModule );
		}
	}

	// EVENTDISPATCHER
	Object.assign( ModuleRequirement.prototype, EventDispatcher.prototype );

	ModuleRequirement.prototype._state;
	Object.defineProperty(ModuleRequirement.prototype, 'state', {
		get:function(){
			return this._state
		},
		set:function(value){
			this._state = value;
			if( window.console && (_debugModuleRequirement || value === 'error') ) console.log('%cModuleRequirement('+this.url+') => ' + value.toUpperCase(), _debugstyle(value) );
			this.dispatchEvent({type:value});
		}
	})

	


	/*
	*
	*
	* FileLoader
	*
	*
	*/
	function FileLoader(url,ready, error, async, jsModule){
		this.url = url;
		this.async = typeof async === 'boolean' ? async : true;
		this.jsModule =  typeof jsModule === 'boolean' ? jsModule : false;

		//console.log(url, jsModule)

		if( typeof ready === 'function' ) this.addEventListener('ready', ready );
		if( typeof error === 'function' ) this.addEventListener('error', error );
		this.load();
	}

	// EVENTDISPATCHER
	Object.assign( FileLoader.prototype, EventDispatcher.prototype );

	// FILELOADER STATE [undefined, ready, error]
	FileLoader.prototype._state;
	Object.defineProperty(FileLoader.prototype, 'state', {
		get:function(){
			return this._state
		},
		set:function(value){
			this._state = value;
			this.progress = 1;
			if( window.console && (_debugFileLoader || value === 'error') ) console.log('%cFileLoader('+this.url+') => ' + value.toUpperCase(), _debugstyle(value) );
			this.dispatchEvent({type:value});
		}
	})

	// FILELOADER NODE: [script, link, string]
	FileLoader.prototype.node;	

	// FILELOADER type [undefined, 'js', 'css', 'php', 'html', 'htm', 'json']
	FileLoader.prototype.type;

	// FILELOADER _url [string]
	FileLoader.prototype._url;

	// FORWARDING XHR PRELOAD
	Object.defineProperty(FileLoader, 'xhrPreload', {
		get:function(){
			return Module.xhrPreload
		}
	})

	Object.defineProperty(FileLoader.prototype, 'url', {
		get:function(){
			return this._url
		},
		set:function(value){
			
			this._url = value;

			var extentions = ['js', 'css', 'php', 'html', 'htm', 'json', 'txt'],
				i, c = extentions.length, ex;

			// GET MODULE TYPE && CLEANUP ID
			for(i=0;i<c;i++){
				ex = extentions[i];
				if( value.indexOf( '.min.' + ex ) === value.length - ex.length - 5 ){
					this.type = ex;
					break;
				}else if( value.indexOf( '.' + ex ) === value.length - ex.length - 1 ){
					this.type = ex;
					break;
				}
			}

		}
	});

	// TRACK DOWNLOAD PROGRESS
	FileLoader.prototype._progress;
	Object.defineProperty(FileLoader.prototype, 'progress', {
		get:function(){
			return this._progress
		},
		set:function(value){
			this._progress = value;
			FileLoader.progress();
		}
	})

	// MAKE SCRIPT/LINK NODE
	FileLoader.prototype.makeNode = function(type){

		var self = this;

		this.node = document.createElement( type );
					document.getElementsByTagName('head')[0].appendChild(this.node);
				
		this.node.addEventListener('load', function(){ self.state = 'ready'; });
		this.node.addEventListener('error', function(){ self.state = 'error'; });
		
		if(  type ==='script' && this.jsModule ){
			//if( window.console ) console.log('FileLoader.makeNode', this.async);
			this.node.type = 'module';
			this.node.async = this.async;
			this.node.src = this.url;
		}else if( type === 'script' ){
			//if( window.console ) console.log('FileLoader.makeNode', this.async);
			this.node.type = 'text/javascript';
			this.node.async = this.async;
			this.node.src = this.url;
		}else if( type === 'link' ){
			this.node.rel = 'stylesheet';
			this.node.type = 'text/css';
			this.node.href = this.url;
		}


		//console.log(this.url, this.type, this.node, this.jsModule)
				
	}

	
	FileLoader.prototype.load = function(){

		var self = this;
			this.progress = 0;

			
		switch( this.type ){
			case 'js':
			case 'css':

				var type = {
					js:'script',
					css:'link'
				}[this.type];

				if( FileLoader.xhrPreload ){
					this.xhr(this.url, function(){
						self.makeNode(type);
					}, function(){
						self.state = 'error';
					});
				}else{
					this.makeNode(type);
				}

			break;
			case 'json':
			case 'php':
			case 'html':
			case 'htm':
			case 'txt':

				this.xhr( this.url, function(){
					if( self.type === 'json' ){
						try{
							self.node = JSON.parse( this.responseText );
							self.state = 'ready';
						}catch(err){
							self.node = this.responseText;
							self.state = 'error';
						}
					}else{
						self.node = this.responseText;
						self.state = 'ready';
					}
				}, function(){
					self.state = 'error';
				});

			break;
			default:
				this.state = 'error';
			break;
		}
	}

	FileLoader.prototype.xhr = function(url, ready, error){

		var self = this;

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true );
		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				if( typeof ready === 'function' ){
					ready.call(this);
				}
			}else {
				if( typeof error === 'function' ){
					error.call(this);
				}
			}
		};
		xhr.onprogress = function(event){
			self.progress = event.loaded/event.total;
		}
		xhr.send();
	}


	// RETREIVE THE CONTENT OF THIS LOADER
	Object.defineProperty(FileLoader.prototype, 'content', {
		get:function(){
			if( this.node ) return this.node;
			return undefined;
		}
	})



	// LOADER REGISTRY
	var _fileloaders = {};

	// STATIC LOADER
	FileLoader.load = function(url, ready, error, async, jsModule){

		if( _fileloaders[url] ){
			
			//if( window.console && _debugFileLoader ) console.log('Existing FileLoader', _fileloaders[url]);
			
			// FILELOADER EXISTS
			if( _fileloaders[url].state === 'ready' ){
				if( typeof ready === 'function' ) ready.call(_fileloaders[url] )
			}else if( _fileloaders[url].state === 'error' ){
				if( typeof error === 'error' ) error.call(_fileloaders[url] )
			}else{
				if( typeof ready === 'function' ) _fileloaders[url].addEventListener('ready', ready );
				if( typeof error === 'function' )  _fileloaders[url].addEventListener('error', error )
			}

		}else{

			// CREATE NEW FILELOADER
			_fileloaders[url] = new FileLoader(url, ready, error, async,jsModule );

		}

		return _fileloaders[url];
	}


	FileLoader.progress = function(){

		var total = 0,
			loaded = 0,
			error = 0,
			progress = 0,
			erroneous = 0;
		for( var s in _fileloaders ){
			
			total++;
			loaded += _fileloaders[s].progress;
			error  += _fileloaders[s].state === 'error' ? 1 : 0;
		
		}

		if( loaded && total ) progress = loaded/total;
		if( error && total ) erroneous = error/total;
		

		if( Module.preloader ) Module.preloader.progress(progress, erroneous);
		if( Module.dashboard ) Module.dashboard.feed( Module.overview );

		return progress
	}



})()