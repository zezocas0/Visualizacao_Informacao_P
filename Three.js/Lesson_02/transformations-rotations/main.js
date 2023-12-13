import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene(  );
const width = window.innerWidth;
const height = window.innerHeight;

const aspect = width/height;
const camera = new THREE.OrthographicCamera(-3 * aspect, 3 * aspect, 3, -3, 1, 1000);


const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor( 0xffffff, 1);
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.y = 5;



// ! Car geometry 

const car= new THREE.Object3D();
//* main body of the car 
const geometry = new THREE.BoxGeometry(2, 1, 4);
const material = new THREE.MeshPhongMaterial({ 
	color: 0x0000FF, 
	specular: 0x0000FF,
	shininess: 100, 
	opacity: 0.3, 
	transparent: true 
});
const body = new THREE.Mesh( geometry, material );
car.add( body );

//* add xyz axis to the center of the car
const xyzg= new THREE.CylinderGeometry(0.05,0.05,0.5,32);
const xmaterial= new THREE.MeshBasicMaterial({color: 0xff0000})
const ymaterial= new THREE.MeshBasicMaterial({color: 0x00ff00})
const zmaterial= new THREE.MeshBasicMaterial({color: 0x0000ff})

const zcoord= new THREE.Mesh(xyzg,zmaterial)
zcoord.position.set(0,0,0.2)
zcoord.rotateX(Math.PI/2)


const ycoord= new THREE.Mesh(xyzg,ymaterial)
ycoord.position.set(0,0.2,0)
ycoord.rotateY(Math.PI/2)

const xcoord= new THREE.Mesh(xyzg,xmaterial)
xcoord.position.set(0.2,0,0)
xcoord.rotateZ(Math.PI/2)

car.add(xcoord)
car.add(ycoord)
car.add(zcoord)

//*  4 wheels on the bottom lower vertices cylinder
const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
const wheelMaterial = new THREE.MeshPhongMaterial( {
	color: 0xff0000,
	specular:0xff0000,
	shininess:100,
	opacity:0.3,
	transparent:true
});
const wheel1 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel1.rotateZ(Math.PI/2);
wheel1.position.set(1, -0.5,2);
wheel1.rotation.y=0.2;
car.add(wheel1);
const wheel2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel2.rotateZ(Math.PI/2);
wheel2.position.set(-1, -0.5, 2);
wheel2.rotation.y=0.2;
car.add( wheel2 );
const wheel3 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel3.rotateZ(Math.PI/2);
wheel3.position.set(1, -0.5, -2);
car.add( wheel3 );
const wheel4 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel4.rotateZ(Math.PI/2);
wheel4.position.set(-1, -0.5, -2);
car.add( wheel4 );

// adding car to scene
scene.add(car);







const sGeometry= new THREE.SphereGeometry(0.25);
const sMaterial= new THREE.MeshBasicMaterial({color: 0x00ff00});
const sphere= new THREE.Mesh(sGeometry,sMaterial);


scene.add(sphere)

let x=0
let y=0
let z=-1

sphere.position.set(x,y,z);

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	//rotate the car tangentially to the xz position
	// Assuming 'sphere' is the THREE.Mesh representing your sphere
	

	// Set the car's position based on its rotation around the sphere
	const angle = Date.now() / 1000; //  speed of rotation baseado no divisor 
	const radius = 2.5; // radius of rotation

	car.position.x = x + radius * Math.sin(angle);
	car.position.y = y;
	car.position.z = z + radius * Math.cos(angle);

	// Point the car towards the center of the sphere
	const rotationAngle = angle + Math.PI / 2; // add pi/2 because if not, 
	//the car would rotate around the car with the z axis poinging to the sphere, making it look like "drifting" around the sphere 
	

    // Apply the rotation to the car
    car.rotation.set(0, rotationAngle, 0);

	




}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

animate();