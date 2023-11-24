Module.export({requires:[
	'/shared/dom/appendHTMLString.js',
	'/shared/ResizeListener.js',
	'/modules/grid/cssgrid.css',
	{id:'grid', url:'/modules/grid/cssgrid.php'},
]}, function(){

	function CssGrid(target){
		
		if( target === undefined ) target = document.getElementsByTagName('body')[0];
		dom.appendHTMLString( target, CssGrid.data.grid );

		var self = this;
		this.grid = document.getElementsByClassName('CssGrid')[0];

		ResizeListener.get().addEventListener('resize', function(){
			
			var gridWidth = self.grid.clientWidth,
				bodyWidth = document.getElementsByTagName('body')[0].offsetWidth,
				columns = 10;
			if( bodyWidth <= 768 ) columns = 8;
			if( bodyWidth <= 640 ) columns = 6;
			if( bodyWidth <= 512 ) columns = 4;

			// SET TILE_HEIGHT
			var columnWidth = (gridWidth/columns)
			self.grid.style.gridAutoRows =  columnWidth + 'px';
			//if( window.console ) console.log(bodyWidth ,'('+self.grid.clientWidth+')', '>', columns, '>',self.grid.style.gridAutoRows );

			// HANDLE ITEMS WITH RATIO
			var ratioNodes = self.grid.querySelectorAll('[ratio]');
			if( ratioNodes ){
				[].forEach.call(ratioNodes, function(node){
					var currentWidth = node.offsetWidth,
						cols = (currentWidth/gridWidth) * columns,
						rows = Math.ceil( columns *  parseFloat( node.getAttribute('ratio'), 10 ) );
					node.style.gridRow = 'auto/span ' + rows;
				});
			}

			// HANDLE 'FULL_HEIGHT' CLASS
			var fullHeight = self.grid.querySelectorAll('.fullHeight > .content > *');
			//if( window.console ) console.log(fullHeight);
			if( fullHeight ){
				[].forEach.call(fullHeight, function(node){

					//var overflow = node.style.overflow;
					//node.style.overflow = 'visible'
					node.style.height = 'auto'
					var fullHeight = node.offsetHeight,
						rows = Math.ceil(fullHeight/columnWidth);
					node.parentNode.parentNode.style.gridRow = 'auto/span ' + rows;

					//node.style.overflow = overflow;

					if( window.console ) console.log(fullHeight, node, node.style);

				});
			}
			
			


		}).nudge();

	}


	CssGrid.prototype.getNode = function(options){
		var count = this.grid.getElementsByClassName('tile').length,
			div = document.createElement('div'),
			content = document.createElement('div');

			div.id = 'CssGrid' + count;
			div.className = 'tile ' + (options.nodeClass || '');

			if( options.ratio !== undefined ) div.setAttribute('ratio', options.ratio );

			content.className = 'content';
			div.appendChild( content );

		this.grid.appendChild(div);
			
		return content;

	}


	CssGrid.prototype.modules;

	CssGrid.prototype.load = function(mdls){

		if( this.modules === undefined ) this.modules = [];
		
		if( !Array.isArray(mdls) ){
			mdls = [mdls];
		}

		var c = mdls.length,
			i;
		for(i=0;i<c;i++){

			var url, options = {};
			if( typeof mdls[i] === 'string' ){
				url = mdls[i]
			}else if( Array.isArray(mdls[i]) ){
				url = mdls[i][0];
				options = mdls[i][1] || {};
			}

			// PREPARE NODE
			var target = this.getNode(options);
			target.setAttribute('title', url );

			options.target = target;

			this.modules.push({url:url, options:options})
		};

		this.next();
	
	}

	CssGrid.prototype.next = function(){


		ResizeListener.get().nudge();
		if( this.modules.length === 0 ) return;

		var current = this.modules[0];
		if( current.state === undefined ){
			current.state = 'loading';
			this.loadModule(current);
		}else if(current.state === 'ready' || current.state === 'error'){
			this.modules.splice(0,1);
			this.next();
		}
	}

	CssGrid.prototype.loadModule = function(module){

		var self = this;
		if( module.options === undefined ) module.options = {};
		if( module.options.nodeClass === undefined ) module.options.nodeClass = '';

		if( module.options.target === undefined ){

			var target = this.getNode(options.options);
			target.setAttribute('title', module.url );

			module.options.target = target;
		}

		
		Module.load(module.url, function(event){

			self.modules[0].state = 'ready';

			// MODULE READY
			var app = new event.target.class(module.options);

			// LOAD NEXT
			self.next();
		}, function(){

			self.modules[0].state = 'error';

			// LOAD NEXT
			self.next();
		});
	}



	return CssGrid;

	
})