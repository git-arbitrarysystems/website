Module.export({
	requires:[
		'/shared/dom/appendHTMLString.js',
		'/modules/app/piano/piano.css',
		{id:'html', url:'/modules/app/piano/piano.html'}
	]
}, function(){

	function Piano(options){

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0]

		this.init();
		//if( window.console ) console.log(this, options);


		dom.appendHTMLString(options.target, Piano.data.html );
		this.renderDom()


	}


	/* 
		
		LOADING AND INITIALISATION

	*/


	// WEB AUDIO CONTEXT
	Piano.prototype.ctx = null;


	// ANALYSER CONNECTION
	Piano.prototype.analyserSmoothing = 0;
	Piano.prototype.analyserUpdateFrequency = 100;
	Piano.prototype.analyserUpdate = function(){
		var self = this;
		////if(window.console) window.console.log( self.analyserData );
	};

	// TRACKING EVENTS
	Piano.prototype.event = function(e){ /*//if(window.console) window.console.log(this, e.type.toUpperCase(), e );*/ };
	Piano.prototype.track = function(object){
		if( object.addEventListener ){
			object.addEventListener('statechange', this.event );
			object.addEventListener('complete', this.event );
			object.addEventListener('ended', this.event );
			object.addEventListener('message', this.event );
			object.addEventListener('loaded', this.event );
			object.addEventListener('audioprocess', this.event );
			object.addEventListener('nodecreate', this.event );
		}
	};

	// COLLECTIONS HOLD CONVENIENCE GROUPS SUCH AS 'C's, or 'ALL FROM OCTAVE 3', etc
	Piano.prototype.collections = {
		o:{}, // OCTAVES
		n:{}, // NOTES
		s:[], // SHARP
		f:[], // FLAT
		add:function(index,note){
			
			
			// ADD TO COLLECTIONS SHARP / FLAT
			this[ (note.indexOf('#') === -1 ? 'f' : 's') ].push(index);

			// ADD TO OCTAVES COLLECTION
			var o = note.charAt( note.length-1 );
			if( this.o.hasOwnProperty(o) === false ) this.o[o] = [];
			this.o[o].push( index );

			var n = note.substr(0, note.length-1 );
			if( this.n.hasOwnProperty(n) === false ) this.n[n] = [];
			this.n[n].push( index );

			////if(window.console) window.console.log('collections.add', index, note, o, n);


		}
	};

	// LOAD MP3'S AND PREPARE WEBAUDIO SOURCES
	Piano.prototype.init = function(){

		var self = this;
		
		try {
			if( 'webkitAudioContext' in window ){
				self.ctx = new webkitAudioContext();
			}else if( 'AudioContext' in window ){
				self.ctx = new AudioContext();
			}
			//window.AudioContext = window.AudioContext || window.webkitAudioContext;
			
			

		}catch(e) {
			alert('Web Audio API is not supported in this browser');
			return;
		}

		this.track( this.ctx );

		var total = this.keys;
		var loaded = 0;
		var errors = 0;

		function check_load(){
			var progress = ( errors + loaded ) / total;
			if( progress === 1 ){
				//if(window.console) window.console.log('Piano.js > Loading complete.', 'Errors:', errors);
				//if(window.console) window.console.log('Piano.js > collections', self.collections );
			}
			//if (window.console) window.console.log( Math.round(progress*100) + '%' );
		}

		function getNote(index){

			// THE NOTE TO REQUEST
			var note = self.itn(index);

			self.collections.add( index, note );

			// GREY OUT KEY TO INDICATE LOADING
			if( self.in_dom ){
				document.getElementById( note ).className += ' loading';
			}

			var url = self.file_from_index(index);

			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			// LOADING MP3 READY
			request.onload = function() {
				self.ctx.decodeAudioData(request.response, function(buffer) {

					// CREATE AND PUSH SOURCE-DATA
					var data = {
						buffer:buffer,
						note:note,
						playing:false,
						released:true
					};

					self.audio[index] = data;


					// CHECK PROGRESS ( SUCCESS )
					loaded++;
					check_load();

				}, function(){

					// CHECK PROGRESS ( DECODE ERROR )
					errors++;
					check_load();

				});
			};
			
			request.onerror = function(){

				// CHECK PROGRESS ( LOAD ERROR )
				errors++;
				check_load();

			};

			request.send();

			return request;

		}


		// CONNECT THE MAIN ANALYSER NODE
		self.analyser = self.ctx.createAnalyser();
		self.analyser.fftSize = 32;
		self.analyser.smoothingTimeConstant = self.analyserSmoothing;
		self.analyserBufferLength = self.analyser.frequencyBinCount;
		self.analyserData = new Uint8Array(self.analyserBufferLength);
		self.analyser.getByteFrequencyData(self.analyserData);
		self.analyser.connect( self.ctx.destination );

		// GAIN 
		self.gain = self.ctx.createGain();
		self.gain.gain.value = 1;
		self.gain.connect( self.analyser );

		// AUTO START ANALYSER 
		setInterval( function(){
			self.analyser.getByteFrequencyData(self.analyserData);
			self.analyserUpdate();
		} , self.analyserUpdateFrequency );


		// PREPARE SOURCE CONTAINER AND LOAD
		this.audio = new Array(this.keys+1);
		for( i=total;i>0;i--){
			//if(window.console) window.console.log(i, this.itn(i), this.nti( this.itn(i) ) );
			getNote(i);
		}

		return;


	};


	/* 
		
		PLAY

	*/


	// AMOUNT OF KEYS
	Piano.prototype.keys = 88;

	// AUDIO-CONTAINER
	Piano.prototype.audio = [];

	// SUSTAIN PEDAL
	Piano.prototype.sustain = true;

	Piano.prototype.setSustain = function(bool){
		this.sustain = bool;

		// STOP ALL RELEASED SOUNDS IF !SUSTAIN
		if( !this.sustain ){
			for( var i=1;i<=this.keys;i++){
				if( this.audio[i] && this.audio[i].playing && this.audio[i].released ) this.si(i);
			}
		}
	};


	Piano.prototype.fade = 0.3;
	Piano.prototype.variation = 0.15;

	Piano.prototype.__strength = 0.5;
	Object.defineProperty(Piano.prototype, 'strength',{
		get:function(){
			return this.__strength;
		},
		set:function(value){
			this.__strength = value;
			if( this.in_dom ){
				document.getElementById('sliderinput_strength').value = '' + value;
				document.getElementById('sliderlabel_strength').innerHTML = 'strength: ' + value;
			}
		}
	});




	Piano.prototype.test = 1;

	Piano.prototype.filter = function(i){
		var f = this.itf(i);
		var d = 1 - (i-1)/this.keys;
		var str = -1;
		while( str <=0 || str > 1 ) str = Math.max( 0, Math.min(1, this.strength + (Math.random()-0.5) * this.variation * ( this.strength + 0.1 ) ) );

		

		var lowpass = Math.round( f * d + f * str * 3 ) + (str * 5 * 60);
		var highpass = Math.round( f*(i-1) /this.keys );
		var gain = Math.round( (str * 0.8 + 0.2 - Math.sin( d * Math.PI ) * 0.4 * (1-str) ) * 1000 ) / 1000;

		var filter =  {
			n:this.itn(i),
			i:i,
			f:Math.round(f)+'Hz',
			d:d,
			variation:str - this.strength,
			strength:str,
			lowpass:lowpass,
			highpass:highpass,
			gain:gain
		};

		////if(window.console) window.console.log(filter);
		return filter;
	};




	// GET CURRENTLY PLAING SOUNDS
	Piano.prototype.getPlaying = function(){
		var playing = [];
		for( var i=1; i<this.keys; i++ ){
			if( this.audio[i] && this.audio[i].playing ) playing.push(this.audio[i] );
		}
		return playing;
	};



	Piano.prototype.file_from_index = function(i){
		return '/modules/app/piano/beskhu.min/'+('0' + i ).substr(-2) + '.mp3';
	};

	Piano.prototype.notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

	// INDEX TO NOTE FORMAT: 0A#
	Piano.prototype.itn = function(i){
		return this.notes[ (i-1)%12] + ( Math.floor( (i-4)/12) + 1 );
	};

	// NOTE TO INDEX
	Piano.prototype.nti = function(note){
		return (this.notes.indexOf( note.toUpperCase().substr(0, note.length-1 ) )+9)%12 + parseInt( note.substr(-1), 10 )*12 - 9 + 1;
	};

	// KEY FREQUENCY
	Piano.prototype.itf = function(i){
		return Math.pow( 2, ( i-49 ) / 12 ) * 440;
	};


	// GET SOUND BY INDEX
	Piano.prototype.gi = function(i){

		var self = this;

		var data = this.audio[i];
		if( !data ) return false;
		
		// STOP A SUSTAINED KEY
		if( data.playing ) this.si(i);

		data.playing = true;
		if( this.in_dom ){
			var e = document.getElementById( this.itn(i) );
			e.className += ' playing';
		}

		data.source = this.ctx.createBufferSource();
		this.track( data.source );
		data.source.buffer = data.buffer;
		data.source.onended = function(){
			self.si(i);
		};

		// CREATE FILTERS
		var filter = this.filter(i);


		// HIGHPASS
		data.highpassNode =  this.ctx.createBiquadFilter();
		data.highpassNode.type = "highpass";
		data.highpassNode.frequency.value = filter.highpass;

		// LOWPASS
		data.lowpassNode =  this.ctx.createBiquadFilter();
		data.lowpassNode.type = "lowpass";
		data.lowpassNode.frequency.value = filter.lowpass;

		// GAIN
		data.gainNode = this.ctx.createGain();
		data.gainNode.gain.value = filter.gain;
		data.gainNode.gain.setValueAtTime(filter.gain, this.ctx.currentTime + data.buffer.duration - this.fade );
		data.gainNode.gain.linearRampToValueAtTime( 0, this.ctx.currentTime + data.buffer.duration );




		// SEQUENTIAL CONNECT ( SOURCE -> EFFECT -> EFFECT -> CTX )
		data.source.connect(data.highpassNode);
		data.highpassNode.connect(data.lowpassNode);
		data.lowpassNode.connect(data.gainNode);
		data.gainNode.connect(self.gain);
		//data.gainNode.connect(self.ctx.destination);


		return data.source;

	};

	// PLAY SOUND BY INDEX
	Piano.prototype.pi = function(i){
		var source = this.gi(i);
		if( source ) source.start(0);
	};

	// STOP SOUND BY INDEX
	Piano.prototype.si = function(i){

		var data = this.audio[i];
		if( !data || data.playing === false ) return false;

		if( this.in_dom ){
			var e = document.getElementById( this.itn(i) );
			e.className = e.className.replace(' playing', '' );
		}

		// CREATE A COPY FOR TIMEOUT REFERENCE
		var copy = {};
		for( var s in data ){
			copy[s] = data[s];
		}

		setTimeout(function(){
			
			// CLEANUP FILTERS	
			for( var s in copy ){
				if( s.indexOf('Node') !== -1 ){
					////if(window.console) window.console.log(i, 'Cleanup', s, copy[s] );
					copy[s].disconnect();
					copy[s] = null;
				}
			}

			// CLEANUP SOURCE
			////if(window.console) window.console.log(i, 'Cleanup', 'source', copy.source );
			copy.source.stop();
			copy.source.disconnect();
			copy.source = null;

		}, this.fade * 1000 );

		// FADE OUT
		data.gainNode.gain.setValueAtTime( data.gainNode.gain.value, this.ctx.currentTime );
		data.gainNode.gain.linearRampToValueAtTime( 0 , this.ctx.currentTime + this.fade );

		// ENABLE PLAY
		data.playing = false;
	};



	// PLAY/STOP NOTE
	Piano.prototype.pn = function(note){
		return this.pi( this.nti(note) );
	};
	Piano.prototype.sn = function(note){
		return this.si( this.nti(note) );
	};

	// CHORDS
	Piano.prototype.chords = {
		'major':[0,4,7],
		'minor':[0,3,7]
	};

	// PLAY/STOP CHORD
	Piano.prototype.pc = function(base,chord){
		if( typeof chord === 'undefined') chord = 'major';
		var a = this.chords[chord];
		for( var i=0;i<a.length;i++){
			this.pi(base+a[i]);
		}
	};
	Piano.prototype.sc = function(base,chord){

		if( typeof chord === 'undefined') chord = 'major';
		var a = this.chords[chord];
		for( var i=0;i<a.length;i++){
			this.si(base+a[i]);
		}
	};


	// PLAY/STOP BY KEYBOARD
	Piano.prototype.keyboard_map = 'QWERTZUIOPASDFGHJKLYXCVBNM';
	Piano.prototype.indexFromCharCode = function(c){
		var k = String.fromCharCode(c);
		var i = this.keyboard_map.toUpperCase().indexOf( k );
		if( i === -1 ) return false;
		return Math.floor( (this.keys - this.keyboard_map.length) * 0.5 ) + i;
	};
	Piano.prototype.keyboardCharFromIndex = function(i){
		i -= Math.floor( (this.keys - this.keyboard_map.length) * 0.5 );
		if( i >= 0 && i < this.keyboard_map.length ) return this.keyboard_map.charAt(i);
		return false;
	};



	// DOM REPRESENTATION
	Piano.prototype.renderDom = function(){

		var self = this;

		// CONTAINER DIV
		var container = document.getElementsByClassName('piano')[0];

		function play(id){
			if( self.mode === 'chord' ){
				self.pc( self.nti(id), self.chordType )
			}else{
				self.pn(id)
			}
		}

		function stop(id){
			if( !self.sustain ){
				if( self.mode === 'chord' ){
					self.sc( self.nti(id), self.chordType )
				}else{
					self.sn(id)
				}
			}
			
		}
		
		for( var i=1; i<=this.keys; i++ ){
			
			var note = this.itn(i);
			var white = ( note.indexOf('#') === -1 );

			// KEY DIV
			var key = document.createElement('div');
			key.setAttribute('draggable', true)
			key.className = 'key '+(white?'white':'black');
			key.id = note;

			key.addEventListener('dragenter', function(){
				play(this.id)
			});

			key.addEventListener('pointerdown', function(){
				play(this.id)
			});

			key.addEventListener('pointerup', function(){
				stop(this.id)
			});
			key.addEventListener('dragleave', function(){
				stop(this.id)
			});

			container.appendChild( key );
		}


		// MODE
		self.mode = 'single';
		container.querySelector('.menu .mode').addEventListener('change', function(){
			self.mode = this.value;
		})

		self.chordType = 'major';
		container.querySelector('.menu .chord-type').addEventListener('change', function(){
			self.chordType = this.value;
		})

		self.setSustain(false);
		container.querySelector('.menu .sustain').addEventListener('change', function(){
			self.setSustain( this.value === 'on' ? true : false );
		})



		


	}
	



	return Piano

})