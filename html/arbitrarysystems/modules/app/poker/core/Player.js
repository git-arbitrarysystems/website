import {Stack} from './Stack.js'

export class Player{
	constructor(id){
		this.id = id;
		this.points = 0;
		this.stack = new Stack();
		this.best = new Stack();
	}
	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('player');
			
			let title = document.createElement('div');
				title.innerHTML = this.id;
			this._view.appendChild( title );

			this._view.appendChild( this.stack.view );
			
			this._view.appendChild( this.best.view );
			this.best.view.classList.add('meta');

			this._meta = document.createElement('div');
			this._meta.classList.add('meta');

			this._view.appendChild(  this._meta );
	

		}
		return this._view;
	}
	
	set meta(meta){
		this.view;
		this._meta.innerHTML = meta;
	}

	rank(rank, max){
		if( typeof rank === 'number' ){
			for( var i=0;i<max;i++) this.view.classList.remove('rank-' + (i+1));
			this.view.classList.add('rank-' + rank );
			this._rank = rank;
		}
		return this._rank;		
	}	
	
}