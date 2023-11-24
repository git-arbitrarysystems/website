export class Graph{
	constructor(game, title = 'graph'){
		this.game = game;
		
		this.title = title;
		this.total = 0;

		this.game.addEventListener('pre-flop', event => { this.preFlop(); });
		this.game.addEventListener('flop', event => { this.onTheFlop(); });
		this.game.addEventListener('turn', event => { this.onTheTurn(); });
		this.game.addEventListener('river', event => { this.onTheRiver(); });

	}

	preFlop(){ this.total = this.game.n; }
	onTheFlop(){}
	onTheTurn(){}
	onTheRiver(){}

	get title(){ return this.view._title.innerHTML; }
	set title(string){ this.view._title.innerHTML = string }

	get total(){ return this._total || 0; }
	set total(int){
		this._total = int;
		this.view._counter.innerHTML = int;
	}

	node(cls = '', txt = ''){
		let node = document.createElement('div');
		node.classList.add('node');
		if( cls ){ cls.split(' ').forEach( c => {  if(c) node.classList.add(c); })}
		node.innerHTML = txt;
		return node;
	}

	
	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('graph');

			this._view._title = document.createElement('div');
			this._view._title.classList.add('title');

			this._view._counter = document.createElement('div');
			this._view._counter.classList.add('counter');

			this._view._content = document.createElement('div');
			this._view._content.classList.add('content');


			this._view.appendChild(this._view._title);
			this._view.appendChild(this._view._counter);
			this._view.appendChild(this._view._content);

		}

		return this._view;

	}
}
