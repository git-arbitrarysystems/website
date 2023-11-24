( function(){

	//
	// POLYFILL PREPEND
	// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
	//
	[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(e){e.hasOwnProperty("prepend")||Object.defineProperty(e,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var r=e instanceof Node;t.appendChild(r?e:document.createTextNode(String(e)))}),this.insertBefore(t,this.firstChild)}})});

	if( !window.dom ) window.dom = {};
	if( !window.dom.prependHTMLString ){
		window.dom.prependHTMLString = function(target, htmlString){
			var temp = document.createElement('div');
				temp.innerHTML = htmlString;
				while( temp.children.length ) target.prepend( temp.children[0] );
		}
	}
})();