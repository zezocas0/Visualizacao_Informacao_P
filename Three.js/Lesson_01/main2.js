import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BufferGeometry();

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

    0.15, -0.95, 0.0,
    0.90, -0.7, 0.0,
    0.65, 0.10, 0.0,
] );

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

var colors = new Uint8Array( [
    255, 0, 0,
    0, 255, 0,
    0, 0, 255,

    255, 0, 0,
    0, 255, 0,
    0, 0, 255,

    255, 0, 0,
    0, 255, 0,
    0, 0, 255,

    255, 0, 0,
    0, 255, 0,
    0, 0, 255,
] );

geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
const geometryMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const triangle = new THREE.Mesh(geometry, geometryMaterial);
scene.add(triangle);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	triangle.rotation.x += 0.01;
	triangle.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();