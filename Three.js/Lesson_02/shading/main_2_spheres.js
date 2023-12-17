import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

const aspect = width/height;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 10, 10);

const material1 = new THREE.MeshPhongMaterial({
    color: '#006063',
specular: '#a9fcff',
shininess: 100
});
material1.flatShading = true;

const material2 = new THREE.MeshPhongMaterial({
    color: '#006063',
specular: '#a9fcff',
shininess: 100
});
material2.flatShading = false;


const sphere1 = new THREE.Mesh(geometry, material1);
const sphere2 = new THREE.Mesh(geometry, material2);

sphere1.position.x = -2.5;
sphere2.position.x = 2.5;

scene.add( sphere1 );
scene.add( sphere2 );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;


const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,0);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);

 

function render() {
	requestAnimationFrame(render);


	
	renderer.render(scene, camera);
	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
