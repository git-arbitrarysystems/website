import * as PIXI from 'pixi.js';
import {TextureData} from 'interface/Interface';
import {Stamp} from 'grid/Stamp';
import {Data} from 'grid/Data';
import {App} from 'App';

export class Face extends PIXI.Container{
	constructor(){
		super();

		this.renderTypes = ['surface', 'road'];
		this.renderTypes.forEach( (type, index) => {
			this[type] = this.addChild( new PIXI.Container() );
			this[type].sortableChildren = true;
			this[type+'Sprite'] = this.addChild( new PIXI.Sprite() );
			this[type+'Sprite'].visible = false;
		});

		this.g = this.addChild( new PIXI.Graphics() );
		this.g.zIndex = 10000000000;

		this.sortableChildren = true;
	}

	

	add( sprite, type, addedZIndex = 0){

		// SET APPROPRIATE Z-INDEX
		sprite.zIndex = 100000 + sprite.y + ((1-sprite.anchor.y) * sprite.texture.orig.height * sprite.scale.y ) + addedZIndex;
		if( sprite.cutoff ){
			sprite.zIndex -= (sprite.texture.orig.height - sprite.cutoff ) * sprite.scale.y;
		}

		if( this[type] ){
			this[type].addChild(sprite);
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			if( !sprite.texture.valid ){
				sprite.texture.on('update', () => {
					this.renderTexture(type);
				})
			}else{
				this.renderTexture(type);
			}
		}else{
			this.addChild(sprite);
		}
 	

		var s,derivate;
		for( s in sprite.derivates ){
			derivate = sprite.derivates[s];
			this.add( derivate, derivate.type || '', derivate.addedZIndex || 0 );
		}
 		
		


		

	}

	remove( sprite, type ){

		for( var s in sprite.derivates ){
			sprite.derivates[s].destroy({children:true});
			if( sprite.derivates[s].type ) type = sprite.derivates[s].type;
		}
		sprite.destroy({children:true});
		
		if( this[type] ){
			this[type].visible = true;
			this[type+'Sprite'].visible = false;
			this.renderTexture(type);
		}
		
		
		
		
	}


	renderTexture(type, delay = true){

		return;

		if( delay ){
			var self = this;
			clearTimeout( this[type + 'RenderDelay'] );
			this[type + 'RenderDelay'] = setTimeout( function(){
				self.renderTexture(type, false);
			}, 1000);
			return;
		}
		
		
		var bounds = this[type].getLocalBounds(),
			w = Math.ceil(bounds.width),
			h = Math.ceil(bounds.height),
			texture = PIXI.RenderTexture.create(w,h);

		console.log('Face.renderTexture', type, w , 'x' , h);

		this[type].x = -bounds.left;
		this[type].y = -bounds.top;

		App.App.renderer.render(this[type], texture);
		this[type+'Sprite'].texture = texture;
		this[type+'Sprite'].x = bounds.left;
		this[type+'Sprite'].y = bounds.top;
		this[type+'Sprite'].visible = true;

		this[type].x = 0;
		this[type].y = 0;
		this[type].visible = false;


	}

	

}


import {HotModule} from 'HotModule'
HotModule(module, Face);

/*get tint(){ return this._tint || 0xffffff; };
	set tint(tint){
		this._tint = tint;
		this.children.forEach( (child) => {
			child.tint = tint;
		})

	}*/