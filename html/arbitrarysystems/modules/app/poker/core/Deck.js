import {Card} from './Card.js';
import {Stack} from './Stack.js';

export class Deck{
	constructor(){
		this.stack = new Stack();
		var i,j,
			s = Card.suits.length,
			r = Card.ranks.length;
		for(i=0;i<s;i++){
			for(j=0;j<r;j++){
				this.stack.add( new Card(Card.ranks[j]+Card.suits[i]) );
			}
		}
	}
	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('deck');
			this._view.appendChild( this.stack.view );
		}
		return this._view;
	}
}
