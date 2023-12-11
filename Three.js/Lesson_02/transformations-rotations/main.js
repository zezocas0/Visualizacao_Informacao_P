import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene(  );
const width = window.innerWidth;
const height = window.innerHeight;

const aspect = width/height;
const camera = new THREE.OrthographicCamera(-3 * aspect, 3 * aspect, 3, -3, 1, 1000);


const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor( 0xffffff, 1);
document.body.appendChild( renderer.domElement );

const car= new THREE.Object3D();

const geometry = new THREE.BoxGeometry(2, 1, 4);
const material = new THREE.MeshPhongMaterial({ 
	color: 0x0000FF, 
	specular: 0x0000FF,
	shininess: 100, 
	opacity: 0.3, 
	transparent: true 
});

const body = new THREE.Mesh( geometry, material );
car.add( body );

// 4 wheels on the bottom lower vertices cylinder with radius 0.5, height 0.2
const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
const wheelMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const wheel1 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel1.rotateZ(Math.PI/2);
wheel1.position.set(1, -0.5,2);
car.add(wheel1);

const wheel2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel2.rotateZ(Math.PI/2);
wheel2.position.set(-1, -0.5, 2);
car.add( wheel2 );

const wheel3 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel3.rotateZ(Math.PI/2);
wheel3.position.set(1, -0.5, -2);
car.add( wheel3 );

const wheel4 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel4.rotateZ(Math.PI/2);
wheel4.position.set(-1, -0.5, -2);
car.add( wheel4 );
scene.add(car);


//view transformation matrices of the object body and wheel 1

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	
	//rotate around point (0,0,-1)
	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

animate();