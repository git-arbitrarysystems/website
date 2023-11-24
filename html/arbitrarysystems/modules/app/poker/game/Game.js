import {EventDispatcher} from '../utils/index.js';
import {Menu} from './Menu.js';
import {Deck, Stack, Player, Card} from '../core/index.js';



export class Game extends EventDispatcher{
	constructor(players = 6){
		super();
		this.menu = new Menu();
		this.deck = new Deck();
		this.cc = new Stack();
		this.players = [];
		this.n = 0;
		for(var i=0;i<players;i++){
			this.players.push( new Player('Player ' + (i+1) ) );
		}

		

	}
	
	initialize(){
		this.n++;
		//console.log('Game', this.n);
		this.view._n.innerHTML = 'game #' + this.n;
		this.p = 0;
		this.deck.stack.shufflecount = 0;
	}

	action(fn){

		fn.call(this);
		
		let next = null,
			event = false
		switch( fn.name ){
			case 'deal':
				if( !this.players.some( player => { return player.stack.length !== 2}) ){
					if( [0,3,4,5].indexOf(this.cc.length) > -1 ){
							 if( this.cc.length === 0 ){ event = 'pre-flop'; }
						else if( this.cc.length === 3 ){ event = 'flop'; }
						else if( this.cc.length === 4 ){ event = 'turn'; }
						else if( this.cc.length === 5 ){ event = 'river'}
					}
				}
				
				if( this.cc.length === 5 ){
					next = this.cleanup;
				}else{
					next = this.deal;
				}
			
			break;
			case 'cleanup':
				if( this.cc.length === 5 ){
					analyse = true;	
				}

				if( this.players.some( player => { return player.stack.length !== 0}) ){
					next = this.cleanup;
				}else{
					next = this.initialize;
				}
			break;
			case 'initialize':
				next = this.deal;
			break;
		}

		let delay = 50;

		if( event ){
			
			this.analyse();
			this.dispatchEvent(event);
			if( this.menu.checked ){
				delay = 1000;
				setTimeout( e => { this.action(next); }, this.menu.highspeed ? 1 : delay );
			}else{
				this.break(next);
			}
		}else{
			if( !this.menu.highspeed ){
				setTimeout( e => { this.action(next); }, delay );
			}else{
				this.action(next);
			}
			
		}
		
		

		


	}

	break(fn){
		this._pending = fn;
		this.menu._continue.disabled = false;
	}

	continue(){
		this.action.call(this, this._pending);
	}

	deal(){
		if( this.deck.stack.shufflecount < 3 ){
			this.deck.stack.shuffle();
		}else if( this.players[this.p].stack.length < 2 ){
			this.players[this.p].stack.add( this.deck.stack.take() );
			this.p = (this.p+1)%this.players.length;
		}else if( this.cc.length < 3 ){
			// FLOP READY
			this.cc.add( this.deck.stack.take() );
		}else if( this.cc.length < 4 ){
			// TURN READY
			this.cc.add( this.deck.stack.take() );
		}else if( this.cc.length < 5 ){
			// RIVER READY
			this.cc.add( this.deck.stack.take() );
		}
	}

	cleanup(){
		if( this.cc.length > 0 ){
			if( this.cc.length === 5 ){
				this.players.forEach( player => {
					player.meta = '';
					player.rank(-1, this.players.length);
					player.best.empty();
				})
			}
			this.deck.stack.add( this.cc.take() );
		}else if( this.players[this.p].stack.length > 0 ){
			this.deck.stack.add( this.players[this.p].stack.take() );
			if( this.players[this.p].stack.length === 0 ){
				this.p = (this.p+1)%this.players.length;
			}
		}
	}

	analyse(){

		
		
		this.players.forEach( (player) => {
			
			let cards = [];
			player.stack.forEach( (card) => { cards.push( card.clone() ); })
			this.cc.forEach( (card) => { cards.push( card.clone() ); })
			
			let byRank = [],
				bySuit = [];
			Card.ranks.forEach( rank => { byRank[ Card.ranks.indexOf(rank) ] = [] });
			Card.suits.forEach( suit => { bySuit[ Card.suits.indexOf(suit) ] = [] });

			cards.forEach( (card) => {
				byRank[ Card.ranks.indexOf(card.rank) ].push( card );
				bySuit[ Card.suits.indexOf(card.suit) ].push( card );
			});

			let hands = ['high-card','one-pair', 'two-pair','three-of-a-kind','straight','flush','full-house','four-of-a-kind','straight-flush','royal-flush'],			
				result = {};
			hands.forEach( hand => {result[hand] = []});

			// GET FLUSH
			bySuit.forEach( (v,i,a) => {
				if( v.length >= 5 ) result.flush = [v];
			});

			
			byRank.forEach( (v,i,a) => {
				if( v.length ){

					// GET STRAIGHT
					if( result.straight.length === 0 ){
						// ADD
						result.straight = [v[0]];
					}else if( v[0].rankIndex ===  result.straight[result.straight.length-1].rankIndex+1 ){
						// ADD
						result.straight.push(v[0]);
					}else if( result.straight.length < 5 ){
						//RESET
						result.straight = [v[0]];
					}

					// GET PAIR ETC
					if( v.length === 4 ) result['four-of-a-kind'].push(v);
					if( v.length === 3 ) result['three-of-a-kind'].push(v);
					if( v.length === 1 ) result['high-card'].push( v );

					if( v.length === 2 ){
						if( result['one-pair'].length === 0 && result['two-pair'].length === 0 ){
							result['one-pair'].push(v);
						}else{
							if( result['one-pair'].length === 1 ){
								result['two-pair'] = result['one-pair'];
								result['one-pair'] = [];
							}
							result['two-pair'].push(v);
							if( result['two-pair'].length === 3 ){
								var lowest = 1000,
									lowestIndex = 0;
								result['two-pair'].forEach( (pair,i,a) => {
									if( pair[0].rankIndex < lowest ){
										lowest = pair[0].rankIndex;
										lowestIndex = i;
									}
								});
								result['two-pair'].splice(lowestIndex, 1);
							}

						}
					}


				}
			});


			if( result.straight.length < 5 ){
				result.straight = [];
			}else{
				result.straight = [result.straight];
			}


			// CHECK STRAIGTH FLUSH
			if( result.flush.length ){

				result.flush[0].sort( (a,b) => { return b.rankIndex - a.rankIndex } )
				//console.log('>', result.flush);

				result.flush[0].forEach( card => {
					if( result['straight-flush'].length === 0 ){
						// ADD
						result['straight-flush'] = [card];
					}else if( card.rankIndex ===  result['straight-flush'][result['straight-flush'].length-1].rankIndex-1 ){
						// ADD
						result['straight-flush'].push(card);
					}else if( result['straight-flush'].length < 5 ){
						//RESET
						result['straight-flush'] = [card];
					}
				});

				if( result['straight-flush'].length < 5 ){
					result['straight-flush'] = [];
				}else{

					result['straight-flush'].sort( (a,b) => { return b.rankIndex - a.rankIndex } )
					if( result['straight-flush'][0].rankIndex === Card.ranks.length-1 ){
						result['royal-flush'] = [result['straight-flush']]
					}else{
						result['straight-flush'] = [result['straight-flush']]
					}

					
				}

				//console.log('>>',result['straight-flush']);
			}


			// FULL HOUSE
			if( result['three-of-a-kind'].length > 0 && (result['one-pair'].length > 0 || result['two-pair'].length > 0) ){
				var t,p;

				result['three-of-a-kind'].forEach( tok => {
					if( !t || t[0].rankIndex < tok[0].rankIndex ) t = tok;
				});

				let pairs = result['one-pair'].concat( result['two-pair'] );
				pairs.forEach( pair => {
					if( !p || p[0].rankIndex < pair[0].rankIndex ) p = pair;
				});

				result['full-house'] = [t.concat(p)];
				

			}


			// CLEAN-UP
			var highcards = result['high-card'].reverse(),
				bestHandIndex = 0,
				bestHandString = 'high-card',
				currentHandIndex;
			for( var s in result ){
				if( result[s].length > 0 ){
					currentHandIndex = hands.indexOf(s);
					if( currentHandIndex > bestHandIndex ){
						bestHandIndex = currentHandIndex;
						bestHandString = s;
					}
				}
			}

		

			
			for( var s in result ){
				// REMOVE ALL BUT THE BEST
				if( s !== bestHandString ) delete result[s];
			}




			
			let bestHand = result[hands[bestHandIndex]],
				bestHandFlat = [];			
			for(var x=0;x<bestHand.length;x++){
				for( var y=0; y<bestHand[x].length; y++ ){
					bestHandFlat.push( bestHand[x][y] );
				}
			}
			bestHandFlat.sort( (a,b) => { return b.rankIndex - a.rankIndex });
			if( bestHandFlat.length > 5 ) bestHandFlat.splice(5);
			if( bestHandFlat.length < Math.min(5, 2 + this.cc.length) ){
				highcards.forEach( a => {
					a.forEach( card => {
						if( bestHandFlat.length < 5){
							bestHandFlat.push( card );
						}
					});
				})
			}


			// CALCULATE HAND VALUE
			let points = bestHandIndex * Math.pow(10,10);
			bestHandFlat.forEach( (card, index) => {
				let baseScore = Math.pow( Card.ranks.length, bestHandFlat.length-index-1 );
				points += baseScore * card.rankIndex;
			});

			//console.log(points, bestHandFlat, result);

		
			player.best.empty();

			if( result['straight'] || result['straight-flush'] ) bestHandFlat.reverse();

			bestHandFlat.forEach( card => { player.best.add(card)} );
			player.points = points;
			player.meta = points + 'pts' + '<br/>(' + hands[bestHandIndex] + ')';

		})

		
		var ranked = this.players.slice(),
			rank = 0;
		ranked.sort( (a,b)=>{ return b.points - a.points });
		ranked.forEach( (player,index) => {
			//console.log('ranked', index, player.points, ranked[index-1] ? ranked[index-1].points : 'xx');
			if( index === 0 || player.points < ranked[index-1].points ){
				rank++;
			}

			// CLEAR ALL RANKINGS
			player.rank(rank, this.players.length);
		});


		


	}




	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('game');



			this.menu.addEventListener('continue', event => { this.continue()})
			

			this._view._n = document.createElement('div');
			this._view._n.classList.add('n')


			
			this._view.community = document.createElement('div');
			this._view.community.classList.add('community');
			this._view.community.appendChild( this.cc.view );

			this._view.appendChild( this.menu.view );
			this._view.appendChild(this._view._n)
			this._view.appendChild( this.deck.view );
			this._view.appendChild( this._view.community );

			var players = document.createElement('div');
			players.classList.add('players');

			this.players.forEach( (player) => {
				players.appendChild( player.view );
				player.view.style.width = (100/this.players.length).toFixed(5) + '%'
			});
			this._view.appendChild(players);
		}
		return this._view;
	}
}