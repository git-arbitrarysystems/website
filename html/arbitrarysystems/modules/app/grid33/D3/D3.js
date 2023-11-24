Module.export({
	requires:['/shared/three/three.min.js','/shared/ResizeListener.js']
}, function(){
	

	/*
	*
	* DATA
	*
	*/

	var a,b,c,d;

	var entities = [-1,1];
	//if (window.console) window.console.log( entities.length, 'entities', entities);


	/*
	12345678
	
	123
	124
	125
	126
	127
	128 // 6
	
	134
	135
	136
	137
	138 // 11

	145
	146
	147
	148 // 15

	156
	157
	158 // 18

	167
	168 // 20

	178 // 21

	234
	235
	236
	237
	238 // 26

	245
	246
	247
	248 // 30

	256
	257
	258 // 33

	267
	268 // 35

	278 // 36

	345
	346
	347
	348 // 40

	356
	357
	358 // 43

	367
	368 // 45

	378 // 46

	456
	457
	458 // 50

	467
	468 // 52

	478 // 53

	567
	568 // 54

	578 // 55

	678 // 56



	*/


	var points = [];
	for( a=0;a<entities.length;a++ ){
		for(b=0;b<entities.length;b++){
			for(c=0;c<entities.length;c++){
				points.push([entities[a],entities[b],entities[c]]);
			}
		}
	}
	//if (window.console) window.console.log(points.length , 'points');

	var lines = [];
	for( a=0;a<points.length;a++){
		for(b=a+1;b<points.length;b++){
			lines.push([ points[a],points[b] ]);
		}
	}
	//if (window.console) window.console.log(lines.length , 'lines');

	var triangles = [];
	for(a=0;a<points.length;a++){
		for(b=a+1;b<points.length;b++){
			for(c=b+1;c<points.length;c++){
				triangles.push( [ points[a], points[b], points[c] ] )
			}
		}
	}
	//if (window.console) window.console.log(triangles.length , 'triangles');



	/*
	*
	* 3D Implementierung
	*
	*/

	var scene, camera, renderer;
	var geometry, material, mesh;
	var group, lines_group, triangles_group;
	var i,a,b,c,d;
	var cw = 2; // CAMWIDTH
	var rsp = Math.PI * 0.5 * 0.0033;

	var width = 800
	var height = width;

	

	function animate() {

	    requestAnimationFrame( animate );

	    if( target.on ){
	    	  group.rotation.x += rsp;
		    group.rotation.y += rsp;
			//group.rotation.z += rsp * 0.5;

		    renderer.render( scene, camera );
	    }

	  

	}

	function rc(){
		return Math.random()*0xFFFFFF;
	}

	function rr(){
		return Math.PI * 0.25;
		return Math.random() * Math.PI * 2;
	}
	

	function init() {

	    scene = new THREE.Scene();

	    //camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
	    //camera.position.set(0,0,3);
	    camera = new THREE.OrthographicCamera( -cw, cw, cw, -cw, -cw, cw );

	    renderer = new THREE.WebGLRenderer();
	    renderer.setSize( width, height );
	    renderer.setClearColor( 0xffffff, 1);

	    

	    group = new THREE.Object3D();
	    lines_group = new THREE.Object3D();
	    triangles_group = new THREE.Object3D();

	    for( i=0; i<lines.length;i++ ){

	    	a = lines[i][0];
	    	b = lines[i][1];

	    	geometry = new THREE.Geometry();
	    	geometry.vertices.push( new THREE.Vector3(a[0],a[1],a[2]) );
	    	geometry.vertices.push( new THREE.Vector3(b[0],b[1],b[2]) );

	    	material = new THREE.LineBasicMaterial({
			    color: 0x000000,
			    transparent:true,
			    opacity:0.01,
			    depthWrite:false
			});

			mesh = new THREE.Line(geometry, material);

			lines_group.add( mesh );
	    }

	    triangles.sort( function(){ return Math.random()-0.5; });

	    for( i=0; i<triangles.length; i++){

	    	a = triangles[i][0];
	    	b = triangles[i][1];
	    	c = triangles[i][2];

	    	/*if (window.console) window.console.log(i);
	    	if (window.console) window.console.log( a[0],a[1],a[2] );
	    	if (window.console) window.console.log( b[0],b[1],b[2] );
	    	if (window.console) window.console.log( c[0],c[1],c[2] );
	    	if (window.console) window.console.log(' ');*/

	    	geometry = new THREE.Geometry();
	    	geometry.vertices.push( new THREE.Vector3(a[0],a[1],a[2]) );
	    	geometry.vertices.push( new THREE.Vector3(b[0],b[1],b[2]) );
	    	geometry.vertices.push( new THREE.Vector3(c[0],c[1],c[2]) );

	    	geometry.faces.push( new THREE.Face3( 0,1,2 ) );
	    	geometry.computeBoundingSphere();

	    	material = new THREE.MeshBasicMaterial({
			    color: rc(),
			    side:THREE.DoubleSide,
			    transparent:true,
				opacity:1,
				depthWrite:false
			});

			

			mesh = new THREE.Mesh(geometry, material);

			triangles_group.add( mesh );

	    }

	    group.add( triangles_group );
	    //group.add( lines_group );
	    scene.add( group );


	   

	    

	}


	var target 
	function D3(options){
		
		if( options === undefined ) options = {};
		if( options.target === undefined ) options.target = document.getElementsByTagName('body')[0];

		
		
		target = options.target;

		init();
		ApplicationOnOff(options.target);

		
		ResizeListener.get().addEventListener('resize', function(){
			renderer.setSize( renderer.domElement.offsetWidth, renderer.domElement.offsetHeight );
			renderer.domElement.style.width = '100%';
			renderer.domElement.style.height = '100%';
		})

		renderer.render( scene, camera );
		animate();
		
		options.target.appendChild( renderer.domElement );

		


	}

	return D3;
})