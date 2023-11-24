import {Graph} from './Graph.js';
import {Card} from '../core/index.js';

export class RankGraph4 extends Graph{
	constructor(game, title = 'Ahead | pre-flop | flop| turn | river | / played'){
		super(game, title);

		this.data = {};
		
		var id,e,inner,
			ranks = Card.ranks.slice().reverse();

		// TOP RANKS
		this.view._content.appendChild( this.node('empty clear') );
		ranks.forEach( (rank,index) => {
			this.view._content.appendChild( this.node('title', rank) );
		})

		ranks.forEach( (rank,index) => {
			this.view._content.appendChild( this.node('clear title', rank) );
			ranks.forEach( (alt_rank, index2) => {
				if( index2 >= index ){
					e = this.node('data');
					
		

					this.view._content.appendChild(e);

					let pf = document.createElement('div'),
						f = document.createElement('div'),
						t = document.createElement('div'),
						r = document.createElement('div');

					e.append(pf);
					e.append(f);
					e.append(t);
					e.append(r);



					var object = this.template();
						object.pf = pf;
						object.f = f;
						object.t = t;
						object.r = r;

					this.data['_' + rank + '_' + alt_rank] = object;

				}else{
					this.view._content.appendChild( this.node('empty') );
				}
			})
		});
	}

	template(){
		return {
			get played(){ return this._played || 0; },
			set played(int){ this._played = int;},
			
			get aheadPreFlop(){ return this._aheadPreFlop || 0; },
			set aheadPreFlop(int){ this._aheadPreFlop = int; },

			get aheadOnTheFlop(){ return this._aheadOnTheFlop || 0; },
			set aheadOnTheFlop(int){ this._aheadOnTheFlop = int; },

			get aheadOnTheTurn(){ return this._aheadOnTheTurn || 0; },
			set aheadOnTheTurn(int){ this._aheadOnTheTurn = int; },

			get aheadOnTheRiver(){ return this._aheadOnTheRiver || 0; },
			set aheadOnTheRiver(int){ this._aheadOnTheRiver = int; },


			update(){

				var s, n, items = {
					'aheadPreFlop':this.pf,
					'aheadOnTheFlop':this.f,
					'aheadOnTheTurn':this.t,
					'aheadOnTheRiver':this.r
				},colors = {
					'aheadPreFlop':'255,0,0',
					'aheadOnTheFlop':'0,255,0',
					'aheadOnTheTurn':'0,0,255',
					'aheadOnTheRiver':'255,0,255',
				}

				for( s in items ){



					n = this[s] / this.played;
					items[s].style.background = 'rgba(0,0,0,'+n.toFixed(4)+')';
					items[s].innerHTML = n.toFixed(2)+'';
					items[s].style.color = (n>0.5) ? '#fff' : '#000';
				}

				
				
			}
		}
	}

	preFlop(){
		super.preFlop();
		this.game.players.forEach( player => {
			player.handID = '';
			player.stack.clone().sort( (a,b) => { return b.rankIndex - a.rankIndex }).forEach( card => { player.handID+='_' + card.rank });
			this.data[player.handID].played++;
			if( player.rank() === 1 ) this.data[player.handID].aheadPreFlop++;
			//console.log('preflop', player.handID, this.data[player.handID]);
		})
	}

	onTheFlop(){
		super.onTheFlop();
		this.game.players.forEach( player => {
			if( player.rank() === 1 ) this.data[player.handID].aheadOnTheFlop++;
			//console.log('preflop', player.handID, this.data[player.handID]);
		})
	}

	onTheTurn(){
		super.onTheTurn();
		this.game.players.forEach( player => {
			if( player.rank() === 1 ) this.data[player.handID].aheadOnTheTurn++;
			//console.log('preflop', player.handID, this.data[player.handID]);
		})
	}

	onTheRiver(){
		super.onTheRiver();
		this.game.players.forEach( player => {
			if( player.rank() === 1 ) this.data[player.handID].aheadOnTheRiver++;
			this.data[player.handID].update();
			//console.log('preflop', player.handID, this.data[player.handID]);
		})
	}

	get view(){
		let view = super.view;
		view.classList.add('rank-graph-4');

		view._content.style.width = (Card.ranks.length+1) *6 + 'em'

		return view;
	}
}

