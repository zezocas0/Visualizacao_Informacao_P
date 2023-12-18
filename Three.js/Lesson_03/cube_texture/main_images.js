import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const materials = [];
const textureLoader = new THREE.TextureLoader();

const textures = [
	"../Im3.jpg",
	"../Im1.jpg",
	"../Im2.jpg",
	"../Im4.jpg",
	"../Im5.jpg",
	"../Im6.jpg",
]



textures.forEach(i =>{
	const texture = textureLoader.load(i);
	const material = new THREE.MeshBasicMaterial({ map: texture });
	materials.push(material);
})

const cube = new THREE.Mesh(geometry, materials);


scene.add(cube);


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	controls.update();

	renderer.render( scene, camera );
}

animate();