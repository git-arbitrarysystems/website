


import {Game} from './game/index.js';
import {Graph, RankGraph, RankGraph4} from './graph/index.js';

window.pokerDemo = function(target, extended){

	console.log('pokerDemo', target, extended)
	var game = new Game( extended ? 9 : 3);
	
	if( extended ){
		var rg = new RankGraph(game);
		var rg4 = new RankGraph4(game);
		target.appendChild( rg.view );
		target.appendChild( rg4.view );
	}
	
	target.appendChild( game.view );
	game.action( game.initialize );
	window.game = game;
}

