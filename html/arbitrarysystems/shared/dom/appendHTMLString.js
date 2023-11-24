( function(){
	if( !window.dom ) window.dom = {};
	if( !window.dom.appendHTMLString ){
		window.dom.appendHTMLString = function(target, htmlString){
			var temp = document.createElement('div');
				temp.innerHTML = htmlString;
				while( temp.children.length ) target.appendChild( temp.children[0] );
		}
	}
})();