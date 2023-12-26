import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';




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

const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,5);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

var drag= false;
var phi=0,theta=0;
var old_x,old_y;


const loader = new FontLoader();
// Declare these variables outside to make them accessible in the render loop

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
	const textGeometry1 = new TextGeometry( 'Cube 1', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
		} );
} );
var materialText = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
textMesh1 = new THREE.Mesh(textGeometry1, materialText);
textMesh1.position.x = -2.5;
textMesh1.position.y = 1.5;




// Mouse event variables
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];


var mouse_down= function(e){
  // Compute transform between mouse and three.js coordinate systems
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  // Calls raycaster function with camera position and orientation
  raycaster.setFromCamera(mouse, camera);
  
  // Check if the ray intercepts any object on the scene
  intersects = raycaster.intersectObjects(scene.children);
  for (var i = 0; i < intersects.length; i++) {
	  intersects[i].object.material.color.set(0xff0000); // Change color to red
  }
}

var mouse_up= function(e){
	drag=false;
}



// Add another cube
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2; // Move it away from the first cube
scene.add(cube2);




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



function render() {
	requestAnimationFrame(render);
	
	controls.update();
	

	renderer.render(scene, camera);

	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
