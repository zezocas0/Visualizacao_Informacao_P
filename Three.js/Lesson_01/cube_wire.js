import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 15);//  radiusTop, radiusBottom, height, and radialSegments
const cylinderMaterial= new THREE.MeshBasicMaterial({color: 0x8B0000 ,wireframe: true})
const cylinder= new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.position.set(2,0,0);
scene.add(cylinder)

const coneGeometry = new THREE.ConeGeometry(1, 2, 15); //  radius, height, and radialSegments
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2,2,0)
scene.add(cone);



const tetrahedronGeometry = new THREE.IcosahedronGeometry(1);
// The parameter is the radius

const tedraheadronMaterial = new THREE.MeshBasicMaterial({color: 0x808080, metalness: 1,roughness: 0.2 })
const tet= new THREE.Mesh(tetrahedronGeometry,tedraheadronMaterial);
tet.position.set(0,2,0)
scene.add(tet);


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	tet.rotation.x+=0.01;
	tet.rotation.y+=0.01

	renderer.render( scene, camera );
}

animate();