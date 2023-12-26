import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial({
    color: '#006063',
specular: '#a9fcff',
shininess: 100
});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.x = -2;

const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,5);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshPhongMaterial({
	color: '#006063',
specular: '#a9fcff',
shininess: 100
});

const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.x = 2;
scene.add( cube2 );

// const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

var drag= false;
var phi=0,theta=0;
var old_x,old_y;

var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once
var intersects = [];

var raio=5;


var mouse_down= function(e){
	drag=true;
	old_x=e.pageX,old_y=e.pageY;
	
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
	//Calls raycaster function with camera position and orientation
	raycaster.setFromCamera( mouse, camera );
	//Check if the ray intercept an object on the scene
	
	intersects = raycaster.intersectObjects(scene.children);
	for (var i=0; i<intersects.length; i++) {
		intersects[i].object.material.color.set(0xff0000); // Change color to red
	}

	return false;
}

var mouse_up= function(e){
	drag=false;
}


var mouse_move= function(e){
    if (!drag) return false;
    var sensitivity = 0.005; // Adjust sensitivity as needed
    var dX = (e.pageX - old_x) * sensitivity;
    var dY = (e.pageY - old_y) * sensitivity;

    theta += dX;
    phi += dY;

    // Clamp the rotation angles
    phi = Math.min(Math.max(phi, -Math.PI / 2), Math.PI / 2); // Limit up/down rotation

    old_x = e.pageX;
    old_y = e.pageY;
}

renderer.domElement.addEventListener("mousedown", mouse_down);
renderer.domElement.addEventListener("mouseup", mouse_up);
renderer.domElement.addEventListener("mousemove", mouse_move);






document.addEventListener('keydown', function(event){

	var keyCode = event.which;
	console.log(keyCode);
	switch (keyCode) {
		case 171: // +
			raio+=1;
			break;
		case 173:	// -
			raio-=1;
			break;
	}
 });


function render() {
	requestAnimationFrame(render);

	camera.position.x = raio * Math.sin(theta) * Math.cos(phi);
	camera.position.y = raio * Math.sin(phi);
	camera.position.z = raio * Math.cos(theta) * Math.cos(phi);
	camera.updateMatrix();
	camera.lookAt(scene.position);

	renderer.render(scene, camera);

	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
