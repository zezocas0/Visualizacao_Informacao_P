import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 20, 10 ); 
const material = new THREE.MeshPhongMaterial({wireframe: true,
    color: '#006063',
specular: '#a9fcff',
shininess: 100
});
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,0);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);



function render() {
	requestAnimationFrame(render);

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;
	
	renderer.render(scene, camera);
	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
