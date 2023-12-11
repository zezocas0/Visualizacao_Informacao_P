import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

const aspect = width/height;
const camera = new THREE.OrthographicCamera(-3 * aspect, 3 * aspect, 3, -3, 1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	
	controls.update();
	
	renderer.render( scene, camera );
}

animate();