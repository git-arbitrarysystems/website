Module.export({
	requires:[
		{id:'html', url:'/modules/app/spider/spider.html'},
		'/modules/app/spider/spider.css',
		'/shared/dom/appendHTMLString.js',
		'/shared/ResizeListener.js'
	]
},function(){

	'use strict'

	function Spider(options){
		
		if( options === undefined ) options = {}
		if( options.autostart === undefined ) options.autostart = true;
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];
		if( window.console ) console.log('Spider.js', options, Spider.data );

		dom.appendHTMLString(options.target, Spider.data.html );

		this.target = options.target;
		this.header = this.target.getElementsByClassName('header')[0];
		this.portrait = this.target.getElementsByClassName('portrait')[0];
		this.icon = this.target.getElementsByClassName('icon')[0];
		this.info = this.target.getElementsByClassName('info')[0];

		this.list = this.info.getElementsByClassName('list')[0]
		this.url = this.info.getElementsByClassName('url')[0]
		
		var self = this;
		this.target.getElementsByClassName('clear-queue')[0].addEventListener('click', function(){
			self.stop();
			setTimeout( function(){
				self.queue = [];
				self.get();
			}, 1000)
			
		});
		this.target.getElementsByClassName('get')[0].addEventListener('click', function(){
			self.get();
		});
		this.target.getElementsByClassName('stop')[0].addEventListener('click', function(){
			self.stop();
		});



		this.checked = [];
		this.queue = [];
		this.images = [];
		if( options.autostart ) this.get();

		window.spider = this;
	}

	Spider.prototype.get = function(url){

		this.auto = true;

		if( url === undefined && this.queue.length ){
			url = this.queue.splice(0,1)[0];
		}

		var curlUrl = '/modules/app/spider/curl.php';
		if( url !== undefined ) curlUrl += '?url=' + url;
	
		var self = this,
			xhr = new XMLHttpRequest();

		xhr.open('GET', curlUrl , true );
		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				
				try{
					var json = JSON.parse(xhr.responseText);
				}catch(e){
					if( window.console ) console.log('error parsing json', xhr.responseText);
				}

				if( json ){
					self.analyse(json);
				}

				
			}

			// CONTINUE
			if( self.auto ) self.get();

		

		};
		xhr.onerror = function(){
			// CONTINUE
			if( self.auto ) self.get();
		}
		xhr.send();
	}

	Spider.prototype.stop = function(){
		this.auto = false;
	}

	Spider.prototype.headerSet = false;
	Spider.prototype.portraitSet = false;
	Spider.prototype.iconSet = false;
	Spider.prototype.autoStopped = false;

	Spider.prototype.insert = function(img){

		if( !img.naturalWidth ) return;
		if( img.naturalWidth < 10 ) return;
		if( img.naturalHeight < 10 ) return;
		if( window.console ) console.log('Spider.insert', img.src);


		var target;
		/*this.queue = this.queue.sort( function(){
			return Math.random()-0.50
		})*/

		if( this.header.children.length === 0 ){
			target = this.header;
			this.headerSet = true;
		}else if( this.portrait.children.length === 0 ){
			target = this.portrait;
			this.portraitSet = true;
		}else if( this.icon.children.length === 0 ){
			target = this.icon
			this.iconSet = true;
		}else if( img.naturalWidth >= 120 ){
			if( img.naturalWidth > img.naturalHeight ){
				target = this.header;
				this.headerSet = true;
			}else{
				target = this.portrait;
				this.portraitSet = true;
			}
		}else{
			target = this.icon;
			this.iconSet = true;
		}

		if( this.headerSet && this.portraitSet && this.iconSet && !this.autoStopped ){
			this.stop();
			this.autoStopped = true;
		}

		var div = document.createElement('div');
		div.style.backgroundImage = 'url('+img.src+')';
		div.style.cursor = 'pointer';
		div.title = img.src;
		div.addEventListener('click', function(){
			window.open(img.src,'_blank');
		});

		target.appendChild( div );


		
			div.style.opacity = 1;
		


		while( target.children.length > 1 ){
			target.removeChild( target.children[0] );
			
		}
		//ResizeListener.get().nudge();

		if( target === this.header ){
			//this.target.style.height  = Math.floor( ( img.naturalHeight / img.naturalWidth ) * this.header.offsetWidth ) + 'px';
		}





	}



	Spider.prototype.analyse = function(json){

		var self = this;
		this.url.innerHTML = 'query:' + json.url + ' ' + json.result;

		if( this.checked.indexOf(json.url) === -1 ){
			this.checked.push(json.url);
			//if( window.console ) console.log('Spider.analyse', json );
		}

		var links = json.links.length, i, link, listedLink;
		for(i=0;i<links;i++){
			link = json.links[i];
			listedLink = link;
			if( link.indexOf('#') !== -1 ){
				listedLink = link.substr(0, link.indexOf('#')-1);
			}

			if( this.checked.indexOf(listedLink) === -1 ){
				if( this.queue.indexOf(listedLink) === -1 ){
					this.queue.push(listedLink);
					if( window.console ) console.log('Spider.queue', listedLink);
				}
			}
		}

		this.queue.sort( function(){
			return Math.random() - 0.5;
		})

		this.list.innerHTML = 'queue: ' + this.queue.length;

		var images = json.images.length, image;
		for(i=0;i<images;i++){
			image = json.images[i];


			if( this.images.indexOf(image) === -1 ){
				this.images.push(image);
				
				var img = document.createElement('img');
				img.onload = function(){

					if( window.console ) console.log('>>>', img.offsetWidth, img.naturalWidth);

					//if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
					//	if( window.console ) console.log('Spider.invalid_image', img.src, img.naturalWidth,  img );
				     //   return false;
				    //}else{
				    	self.insert(img);

				   // }
					
				}
				img.src = image;

				

			}
		}

	}

	return Spider;

})