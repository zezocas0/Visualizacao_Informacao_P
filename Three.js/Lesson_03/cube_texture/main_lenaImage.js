import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const geometry = new THREE.SphereGeometry( 1, 32, 32);


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../earth_surface_2048.jpg"); 

const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, planeMaterial);


scene.add(sphere);


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	// sphere rotation on the z axis=0.41 radians
	sphere.rotation.z += 0.01;
	sphere.rotation.y += 0.00025;


	controls.update();

	renderer.render( scene, camera );
}

animate();