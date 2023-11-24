import {Graph} from './Graph.js';
import {Card} from '../core/index.js';

export class RankGraph extends Graph{
	constructor(game, title = 'Won/played'){
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

					var object = this.template();
						object.e = e;
					this.data['_' + rank + '_' + alt_rank] = object;

				}else{
					this.view._content.appendChild( this.node('empty') );
				}
			})
		});
	}

	template(){
		return {
			get played(){ return this._played || 0;  },
			set played(int){ this._played = int; this.update();},
			get won(){ return this._won || 0; },
			set won(int){ this._won = int;},
			update(){
				let n = this.won / this.played;
				this.e.style.background = 'rgba(0,0,0,'+n.toFixed(4)+')';
				this.e.innerHTML = n.toFixed(2)+'';
				this.e.style.color = (n>0.5) ? '#fff' : '#000';
			}
		}
	}



	onTheRiver(){
		super.onTheRiver();
		this.game.players.forEach( player => {
			let hand = player.stack.clone().sort( (a,b) => { return b.rankIndex - a.rankIndex }),
				id = '';
			hand.forEach( card => { id+='_' + card.rank });
			if( player.rank() === 1 ) this.data[id].won++;
			this.data[id].played++;
		});
	}

	get view(){
		let view = super.view;
		view.classList.add('rank-graph')
		return view;
	}
}
