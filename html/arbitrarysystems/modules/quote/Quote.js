Module.export({
	requires:['/shared/jquery/jquery-3.3.1.min.js','/shared/dom/appendHTMLString.js','/modules/quote/quote.css']
},function(){

	function Quote(options){

		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementById('body')[0];
		if( options.id === undefined ) options.id = 'DasBeliebigkeitsSpiel';

		//if( window.console ) console.log(options);

		var div = document.createElement('div');
		options.target.appendChild(div);

		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/modules/quote/' + options.id + '.html' , true );
		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				var content = $(xhr.responseText);
				$(div).append( content );

				var script = new XMLHttpRequest();
				script.open('GET', '/modules/quote/' + options.id + '.js' , true );
				script.onload = function() {
					if (script.status === 200 && script.readyState === 4) {
						var content = $('<script>' + script.responseText + '</script>');
						$(div).append( content );
					}
				};
				script.send();


			}
		};
		xhr.send();

		


		
	}

	return Quote;


})