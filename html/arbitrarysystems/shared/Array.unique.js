// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
if( !Array.prototype.unique ){
	Object.defineProperty(Array.prototype, 'unique', {
		enumerable: false,
		value: function () {
			var a = [];
			for (var i=0, l=this.length; i<l; i++)
				if (a.indexOf(this[i]) === -1)
					a.push(this[i]);
			return a;
		}
	});
}
