import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BufferGeometry();
var geometry2 = new THREE.BufferGeometry();

const vertices = new Float32Array( [
	0.0, 0.0, 0.0,
    0.5, 0.75, 0.0,
    1.0, 0.0, 0.0,

    0.0, 0.0, 0.0,
    -0.35, -1.0, 0.0,
    -0.7, 0.25, 0.0,

    -0.2, 0.15, 0.0,
    0.35, 0.65, 0.0,
    -0.85, 0.9, 0.0,

 
] );

const vertices_last_triangle = new Float32Array([
    0.15, -0.95, 0.0,
	0.90, -0.7, 0.0,
	0.65, 0.10, 0.0
]);

geometry2.setAttribute('position', new THREE.BufferAttribute(vertices_last_triangle, 3));


geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

var colors = new Uint8Array( [
    255, 51, 153, // RGB para cor rosa
    255, 51, 153,
    255, 51, 153,

	255, 255, 0,
    255, 255, 0,
    255, 255, 0,

    255, 0, 0,
    0, 255, 0,
    0, 0, 255,
] );

var colors2 = new Uint8Array( [    
	255, 255, 255,
    255, 255, 255,
    255, 255, 255,]);



geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
const geometryMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const triangle = new THREE.Mesh(geometry, geometryMaterial);
scene.add(triangle);

geometry2.setAttribute('color', new THREE.BufferAttribute(colors2, 3, true));
const geometryMaterial2 = new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true });
const triangle2 = new THREE.Mesh(geometry2, geometryMaterial2);
scene.add(triangle2);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	triangle.rotation.x += 0.01;
	triangle.rotation.y += 0.01;
	triangle2.rotation.x += 0.01;
	triangle2.rotation.y += 0.01;
	renderer.render( scene, camera );
}



animate();