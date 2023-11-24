Module.export(function(){

	class Person{
		firstname:string;
		lastname:string;
		get name():string{
			return this.firstname + ' ' + this.lastname;
		}
		constructor(firstname:string, lastname:string) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.cheers();
		}
		public hello(){
			console.log(`I am ${this.name}, chin chin!`);
		}
		public cheers(){
			this.hello();
		}
	}

	class Jasper extends Person {
		
		constructor() {
			super('Jasper', 'Funk-Smit')
		}
	}


	function TypeScripted(){
		console.log( 'TypesScripted Module' );
		new Jasper()
	}

	return TypeScripted;
})