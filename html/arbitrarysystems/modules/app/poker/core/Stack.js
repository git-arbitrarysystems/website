export class Stack extends Array{
	constructor(){
		super();
		this.shufflecount = 0;
	}
	empty(){
		while( this.length ) this.remove( this[0] );
	}
	add(card){
		this.push(card);
		this.view.appendChild(card.view);
	}
	take(){
		return this.remove( this[ this.length-1 ] );
	}
	remove(card){
		this.splice( this.indexOf(card), 1 );
		this.view.removeChild(card.view);
		return card;
	}
	shuffle(){
		this.shufflecount++;
		this.sort( ()=>{ return Math.random()-0.5 });
		this.forEach( (card) => { this.view.appendChild(card.view); })
	}
	clone(){
		return this.map( card => { return card.clone(); })
	}
	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('stack');
		}
		return this._view;
	}
}

