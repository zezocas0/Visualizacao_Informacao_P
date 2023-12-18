
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// Adjust the camera's position and field of view
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 1500); // Position the camera further away

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const DISTANCE_FROM_EARTH = 356400;
const PERIOD = 28;
const INCLINATION = 0.089;
const SIZE_IN_EARTHS = 1 / 3.7;
const EARTH_RADIUS = 6371; // This is large, consider scaling down

// Load textures
const textureLoader = new THREE.TextureLoader();
const earthtexture = textureLoader.load("../earth_surface_2048.jpg");
const moontexture = textureLoader.load("../moon_1024.jpg");

// Earth
const earthgeometry = new THREE.SphereGeometry(100, 32, 32); // Scale down the size
const earthMaterial = new THREE.MeshPhongMaterial({map: earthtexture, specular: 0xffffff, shininess: 30});
const earth = new THREE.Mesh(earthgeometry, earthMaterial);
scene.add(earth);

// Moon
const moonGeometry = new THREE.SphereGeometry(100 * SIZE_IN_EARTHS, 32, 32); // Scale down the size
const moonMaterial = new THREE.MeshPhongMaterial({map: moontexture, specular: 0xffffff, shininess: 30});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Position the moon

moon.position.set(Math.sqrt(DISTANCE_FROM_EARTH / 2), 0, -Math.sqrt(DISTANCE_FROM_EARTH / 2)); // Adjust position
moon.rotation.x=INCLINATION;
moon.rotation.y=Math.PI;




document.addEventListener('keydown', onDocumentKeyDown, false); 
function onDocumentKeyDown(event) {
// to obtain the keycode 
	var keyCode = event.which;
	console.log(keyCode);
	switch (keyCode) {
		case 76: // L
		  directionalLight.intensity = (directionalLight.intensity === 0) ? 0.5 : 0;
		  break;
		case 171: // +
		  if (directionalLight.intensity < 1) {
			console.log(directionalLight.intensity)
			directionalLight.intensity += 0.1;
		  }
		  break;
		case 173:	// -
		  if (directionalLight.intensity >= 0) {
			directionalLight.intensity -= 0.1;
		  }
		  break;
		case 37: // left arrow
			// increase rotation 
			rotationSpeed += 0.01;
			console.log(rotationSpeed);
			break; // Added break statement here
		case 39: // right arrow
			// decrease rotation
			rotationSpeed -= 0.01;
			console.log(rotationSpeed);

			break; // Added break statement here
	
	default :
		break;
	
	}
		  
}


// Lighting
const ambientLight = new THREE.AmbientLight(0x606060, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(200, 0, 100); // Adjust light position
scene.add(directionalLight);



// Other configurations
earth.rotation.z = 0.41;
var rotationSpeed = 0.25;
const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    controls.update();

    earth.rotation.y += rotationSpeed;

	

	const moonOrbitSpeed = rotationSpeed / (PERIOD * 24); // Moon's orbit speed
    const angle = Date.now() * moonOrbitSpeed; // angle in radians
	
	const radius = Math.sqrt(DISTANCE_FROM_EARTH/2); // radius of rotation
	//moon.position.set(Math.sqrt(DISTANCE_FROM_EARTH / 2), 0, -Math.sqrt(DISTANCE_FROM_EARTH / 2)); // Adjust position


	moon.position.x =  radius *Math.sin(angle)
    moon.position.z =  radius * Math.cos(angle)


	moon.rotation.y+=moonOrbitSpeed;

	console.log(moon.position)

	renderer.render(scene, camera);


}

animate();
