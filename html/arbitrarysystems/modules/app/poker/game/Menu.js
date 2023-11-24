import {EventDispatcher} from '../utils/index.js';

export class Menu extends EventDispatcher{
	constructor(target = document.body){
		super();
		target.appendChild( this.view );
		this.checked = false;
		this.highspeed = true;
	}
	get view(){
		if( !this._view ){
			this._view = document.createElement('div');
			this._view.classList.add('menu');

			this._continue = document.createElement('button');
			this._continue.innerHTML = 'continue';
			this._continue.disabled = true;
			this._continue.addEventListener('click', event=>{
				this._continue.disabled = true;
				this.dispatchEvent('continue');
			});


			var label_ar = document.createElement('label');
				label_ar.innerHTML = 'autorun';

			this._autorun = document.createElement('button');
			this._autorun.classList.add('checkbox');
			this._autorun.addEventListener('click', ()=>{
				this.checked = !this.checked;
			});


			var label_hs = document.createElement('label');
				label_hs.innerHTML = 'highspeed';

			this._highspeed = document.createElement('button');
			this._highspeed.classList.add('checkbox');
			this._highspeed.addEventListener('click', ()=>{
				this.highspeed = !this.highspeed;
			});
			
		
			this._view.appendChild(this._continue);

			this._view.appendChild(label_ar)
			this._view.appendChild(this._autorun);

			this._view.appendChild(label_hs)
			this._view.appendChild(this._highspeed);


		}
		return this._view;
	}


	get checked(){ return this._checked || false; }
	set checked(bool){
		this._checked = bool;
		this._autorun.setAttribute('checked', bool);
		this._continue.disabled = bool;
		if( bool ) this.dispatchEvent('continue');
	}

	get highspeed(){ return this._highspeed.checked; }
	set highspeed(bool){ 
		this._highspeed.checked = bool;
		this._highspeed.setAttribute('checked', bool);
	}

	



}