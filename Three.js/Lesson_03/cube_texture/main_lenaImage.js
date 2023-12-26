import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../lena.jpg"); 
const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, planeMaterial);
scene.add(cube);




const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.z += 0.01;
	// cube.rotation.y += 0.01;


	controls.update();

	renderer.render( scene, camera );
}

animate();