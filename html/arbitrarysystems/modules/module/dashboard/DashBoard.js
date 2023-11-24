Module.export({
	requires:[
		'/modules/module/dashboard/dashboard.css',
		'/shared/polyfills/classList.js',
		'/shared/dom/appendHTMLString.js',
		{id:'html', url:'/modules/module/dashboard/dashboard.html'}
	]
}, function(){
	
	'use strict'

	function DashBoard(options){
		
		this.greet();
		this.parentElement = options && options.target ? options.target : document.getElementsByTagName('body')[0];
		
		dom.appendHTMLString( this.parentElement, DashBoard.data.html );
		
		this.table = document.getElementById('dashboard');
		this.tableBody = this.table.getElementsByTagName('tbody')[0];


		this._nodes = {};
		this._requirementNodes = {};
	}

	DashBoard.prototype.greet = function(){
		if( window.console ) console.log('Hello! I am DashBoard');//, DashBoard.data.html );
	}

	DashBoard.prototype.feed = function(list){

		var html = '',
			object,node,
			// MODULE
			i, c = list.length,
			// REQUIREMENTS
			ri, rc, rid;
		
		for( i=0;i<c;i++){

			// MODULE
			object = list[i];
			if( !this._nodes[object.id] ){
				node = this.createNode(object.id, object );
				this.tableBody.appendChild(node)
			}
			this.updateNode(object.id, object)

			rc = object.requirements.length;
			for(ri=0;ri<rc;ri++){
				// REQUIREMENT

				rid = '_req'+ ri + '_' + object.requirements[ri].id;

				if( object.requirements[ri].id !== undefined ){
					if( !this._nodes[rid] ){
						node = this.createNode(rid, object.requirements[ri] );
						this._nodes[object.id].parentNode.insertBefore(node, this._nodes[object.id].nextSibling);
					}
					this.updateNode(rid, object.requirements[ri] )
				}
				
			}
		}
	}




	DashBoard.prototype.createNode = function(id, object){

		var div = document.createElement('tr');
			div.title = object.id;
			
			div.innerHTML = '<td class="name"></td><td></td><td></td><td class="state"><div></div></td>';

		var name = id.substring( id.lastIndexOf('/')+1 )

		if( object.requirements ){
			div.children[0].innerHTML = name;
			div.className = 'module';
		}else{
			div.children[1].innerHTML = name;
			div.className = 'requirement';
		}

		this._nodes[id] = div;
		return div;
	}

	DashBoard.prototype.updateNode = function(id, object){

		var node = this._nodes[id],
			progress = object.progress === undefined ? '' : Math.round(object.progress*100) + '%';


		if( !object.requirements ){
			node.children[2].innerHTML = progress;
		}
		
		//node.children[3].innerHTML = object.state;

		if( object.state === 'error' ){
			node.classList.remove('ready');
			node.classList.add('error');
		}else if( object.state === 'ready' ){
			node.classList.remove('error');
			node.classList.add('ready');
		}
	}

	return DashBoard;
})