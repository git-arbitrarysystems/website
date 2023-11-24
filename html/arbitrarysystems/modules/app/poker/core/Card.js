class Card extends String{
	constructor(code){
		if( !code ) code = Card.rand;
		super(code);
		this.init(code);
	}
	init(code){
		this.suit = code.charAt( code.length-1 );
		this.rank = code.substr(0, code.length-1);
		this.rankIndex = Card.ranks.indexOf(this.rank);
		this.color= ['♥','♦'].indexOf(this.suit) === -1 ? 'black' : 'red';
	}
	clone(){
		return new Card(this);
	}
	
	get view(){
		if( !this._view ){
			this._view = document.createElement('span');
			this._view.classList.add('card');
			this._view.style.color = this.color;
			this._view.innerHTML = this;
		}
		return this._view;
	}

	static get rand(){
		return Card.ranks[ Math.floor(Math.random() * Card.ranks.length) ] + 
			   Card.suits[ Math.floor(Math.random() * Card.suits.length) ];
	}

}

Card.suits = ['♠','♥','♣','♦'];
Card.ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

export {Card};