Module.export(function(){

	'use strict'

	function Tweenable(property, target){
		var tweenproperty = 't' + property;

		Object.defineProperty(target, tweenproperty, {
			get:function(){
				return target['_'+tweenproperty];
			},
			set:function(value){

				if( property === 'rotation' ){
					var a = target.rotation%(Math.PI*2);
					if( a < -Math.PI ) a+= Math.PI*2;
					if( a >  Math.PI ) a-= Math.PI*2;

					var b = value%(Math.PI*2);
					if( b < -Math.PI ) b+= Math.PI*2;
					if( b >  Math.PI ) b-= Math.PI*2;

					target.rotation = a;
					var ad = (b-a),
						bd = (b-a + (a<b?-2:2)*Math.PI  ),
						d = Math.abs(ad)<Math.abs(bd) ? ad : bd;

					target.tweenable['_d'+property] = d / Tweenable.framesPerTween;;
				}else{
					target.tweenable['_d'+property] = (value-target[property]) / Tweenable.framesPerTween;;	
				}

				target['_'+tweenproperty] = value;
				target.tweenable['_c'+property] = Tweenable.framesPerTween;
				target.tweenable.tweens[property] = true;
				target.tweenable.requiresUpdate = true;
			}
		});

		if( !target.tweenable ){
			target.tweenable = {
				tweens:{},
				requiresUpdate:false,
				update:function(){
					if( target.tweenable.requiresUpdate ){
						target.tweenable.requiresUpdate = false;
						for( var s in target.tweenable.tweens ){
							if( target.tweenable.tweens[s] ){
								target[s] += target.tweenable['_d' + s ];
								target.tweenable['_c' + s ]--;
								if( target.tweenable['_c' + s ] === 0 ){
									target.tweenable.tweens[s] = false;
								}else{
									target.tweenable.requiresUpdate = true;
								}
							}
						}
					}
				}
			}
		}
		target.tweenable.tweens[property] = false;
	}

	Tweenable.framesPerTween = 50;
	return Tweenable;

})