import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene(  );
const width = window.innerWidth;
const height = window.innerHeight;

const aspect = width/height;
const camera = new THREE.OrthographicCamera(-3 * aspect, 3 * aspect, 3, -3, 1, 1000);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor( 0xffffff, 1);
document.body.appendChild( renderer.domElement );

const car= new THREE.Object3D();

const geometry = new THREE.BoxGeometry(2, 1, 4);
const material = new THREE.MeshPhongMaterial({ 
	color: 0x0000ff, 
	specular: 0x0000FF,
	shininess: 100, 
	opacity: 0.3, 
	transparent: true 
});

const body = new THREE.Mesh( geometry, material );
car.add( body );

// 4 wheels on the bottom lower vertices
const wheelGeometry = new THREE.SphereGeometry(0.25);
const wheelMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const wheel1 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel1.position.set(1, -0.5,2);
car.add(wheel1);

const wheel2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel2.position.set(-1, -0.5, 2);
car.add( wheel2 );

const wheel3 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel3.position.set(1, -0.5, -2);
car.add( wheel3 );

const wheel4 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel4.position.set(-1, -0.5, -2);
car.add( wheel4 );
scene.add(car);


//view transformation matrices of the object body and wheel 1
console.log("body matrix");
console.log(body.matrix);
// [ 1, 0, 0, 0 
//   0, 1, 0, 0
//   0, 0, 1, 0
//   0, 0, 0, 1 ]

console.log("wheel1 matrix");
console.log(wheel1.matrix);
// [ 1, 0, 0, 1 
//   0, 1, 0, -0.5 
//	 0, 0, 1, 2 
//   0, 0, 0, 1 ]

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	

}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

animate();