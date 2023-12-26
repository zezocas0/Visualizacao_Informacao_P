import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );




const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../lena.jpg"); 

const planeGeometry = new THREE.PlaneGeometry(3,3);
const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.position.y = -1.5; 
plane.rotation.x = -Math.PI / 2; 
scene.add(plane);


camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();