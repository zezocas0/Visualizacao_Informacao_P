import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 10, 10);

const emerald = new THREE.MeshPhongMaterial({
	shading: THREE.SmoothShading	});
	emerald.color = new THREE.Color(0.05, 0.0, 0.0);
	emerald.specular = new THREE.Color(0.7, 0.04, 0.04);
	emerald.diffuse = new THREE.Color(0.5, 0.4, 0.4);
	emerald.shininess = 0.0781 * 256;

	const blackRubber = new THREE.MeshPhongMaterial({
		color: new THREE.Color(0.02, 0.02, 0.02),
		specular: new THREE.Color(0.4	, 0.4, 0.4),
		shininess: 0.0781 * 256
	});

//material.flatShading = true;

const sphere1 = new THREE.Mesh(geometry, emerald);
const sphere2 = new THREE.Mesh(geometry, blackRubber);

sphere1.position.x = -2.5;
sphere2.position.x = 2.5;

scene.add(sphere1);
scene.add(sphere2);

const largerGeometry = new THREE.SphereGeometry(1.5, 10, 10);
const glassMaterial = new THREE.MeshPhongMaterial( { 
	color: 0x222222, 
	specular: 0xFFFFFF,
	shininess: 100, 
	opacity: 0.2, 
	transparent: true 
	} );

const largerSphere1 = new THREE.Mesh(largerGeometry, glassMaterial);
const largerSphere2 = new THREE.Mesh(largerGeometry, glassMaterial);

largerSphere1.position.x = -2.5;
largerSphere2.position.x = 2.5;

scene.add(largerSphere1);
scene.add(largerSphere2);


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;


const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,0);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);



function render() {
	requestAnimationFrame(render);

	sphere1.rotation.x += 0.01;
	sphere1.rotation.y += 0.01;
	
	renderer.render(scene, camera);
	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
