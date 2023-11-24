/**
* @author jfs / http://arbitrarysystems.com/
*/
function getByKey(key, _scope){
	if( _scope === undefined ) _scope = window;
	
	var _list = key.split('.'),
		c = _list.length, i;
	
	for( i=0;i<c;i++){
		if( typeof _scope[_list[i]] === 'undefined' ){
			return undefined;
		}else{
			_scope = _scope[_list[i]];
		}
	}
	return _scope;
}

function setByKey(key, value, _scope ){
	
	if( _scope === undefined ) _scope = window;

	var _list = key.split('.'),
		c = _list.length,
		name = _list[c-1],
		i;

	for( i=0;i<c-1;i++){
		if( typeof _scope[_list[i]] === 'undefined' ){
			_scope[ _list[i] ] = {};
		}
		_scope = _scope[ _list[i] ];
	}

	_scope[name] = value;

}