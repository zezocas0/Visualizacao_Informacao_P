import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial({
    color: '#006063',
specular: '#a9fcff',
shininess: 100
});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const light = new THREE.DirectionalLight(0xFFFFFF, 1, 1000);
light.position.set(0,5,5);
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff);
scene.add(alight);


// const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

var drag= false;
var phi=0,theta=0;
var old_x,old_y;

var mouse_down= function(e){
	drag=true;
	old_x=e.pageX,old_y=e.pageY;
	return false;
}

var mouse_up= function(e){
	drag=false;
}


var mouse_move= function(e){
    if (!drag) return false;
    var sensitivity = 0.005; // Adjust sensitivity as needed
    var dX = (e.pageX - old_x) * sensitivity;
    var dY = (e.pageY - old_y) * sensitivity;

    theta += dX;
    phi += dY;

    // Clamp the rotation angles
    phi = Math.min(Math.max(phi, -Math.PI / 2), Math.PI / 2); // Limit up/down rotation

    old_x = e.pageX;
    old_y = e.pageY;
}

renderer.domElement.addEventListener("mousedown", mouse_down);
renderer.domElement.addEventListener("mouseup", mouse_up);
renderer.domElement.addEventListener("mousemove", mouse_move);



function render() {
	requestAnimationFrame(render);
	
	// controls.update();
	cube.rotation.y = theta;
	cube.rotation.x = phi;
	

	renderer.render(scene, camera);

	
}

window.addEventListener('resize', function () {				       
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	});

render();
