import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../earth_surface_2048.jpg"); 


const geometry = new THREE.SphereGeometry(1, 32, 32);

const sphereMaterial = new THREE.MeshPhongMaterial({map: texture,
	specular: 0xffffff, 
    shininess: 30		 
});
const sphere = new THREE.Mesh(geometry, sphereMaterial);
 
scene.add(sphere);

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

// sphere rotation on the z axis=0.41 radians to llok like 
sphere.rotation.z=0.41

//lighting
const ambientLight= new THREE.AmbientLight(0x333333, 0.5);
scene.add(ambientLight);

const directionalLight= new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2,0,0);
scene.add(directionalLight);

var rotationSpeed = 0.0025;
var inclination = 0;


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
			break; 

		case 39: // right arrow
			// decrease rotation
			rotationSpeed -= 0.01;
			console.log(rotationSpeed);
			break; 

		case 38: // up arrow
		  	// increase inclination
			inclination += 0.01;
			console.log(inclination);
			break;
			 
		case 40: // down arrow
		  	// decrease inclination
			inclination -= 0.01;
			console.log(inclination);
			break; 
	
	default :
		break;
	
	}
		  
}




function animate() {
	requestAnimationFrame( animate );
	controls.update();

	sphere.rotation.y+= rotationSpeed;
	// console.log(rotationSpeed);

	renderer.render( scene, camera );
}

animate();