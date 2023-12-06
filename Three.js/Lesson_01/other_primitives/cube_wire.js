import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/
camera.position.z = 5;


const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 15);//  radiusTop, radiusBottom, height, and radialSegments
const cylinderMaterial= new THREE.MeshBasicMaterial({color: 0x8B0000 ,wireframe: true})
const cylinder= new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.position.set(2.5,0,0);
scene.add(cylinder)

const coneGeometry = new THREE.ConeGeometry(1, 2, 15); //  radius, height, and radialSegments
const coneMaterial = new THREE.MeshMatcapMaterial({ color: 0x8B0000 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2.5,2,0);
scene.add(cone);



const tetrahedronGeometry = new THREE.IcosahedronGeometry(1);
// The parameter is the radius
	
const tedraheadronMaterial = new THREE.MeshNormalMaterial()
const tet= new THREE.Mesh(tetrahedronGeometry,tedraheadronMaterial);
tet.position.set(-0.3,2.2,0);
scene.add(tet);


const group = new THREE.Group();

const geometryCilindro = new THREE.CylinderGeometry( 0.03, 0.03, 1.2, 32 ); 
const materialCilindro = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinderRedeL = new THREE.Mesh( geometryCilindro, materialCilindro ); 
cylinderRedeL.position.set(-5.06,0,0);
group.add( cylinderRedeL );

const cylinderRedeR = cylinderRedeL.clone();
cylinderRedeR.position.set(-1.93,0,0)
group.add( cylinderRedeR );

const redeGeometry = new THREE.BoxGeometry(0.1,0.5,3,10,10,10);
const redeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe:true });
const rede = new THREE.Mesh(redeGeometry, redeMaterial);
rede.position.set(-3.4, 0.5, 0.1);
rede.rotation.y = 1.6;
group.add(rede);


const geometryBall = new THREE.SphereGeometry(0.25, 10, 10);
const materialBall = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe: true} );
const ball = new THREE.Mesh( geometryBall, materialBall );
ball.position.set(-3.4, 1.2, 0-1);
group.add(ball);

const geometryChao = new THREE.BoxGeometry(7, 5, 0.01); 
const materialChao = new THREE.MeshBasicMaterial( {color: 0xffffff} ); 
const chao = new THREE.Mesh( geometryChao, materialChao ); 
chao.rotation.x = 1.7;
chao.position.set(-6,-0.7,-4);
group.add(chao);

scene.add(group);

const geometry2 = new THREE.TorusGeometry( 0.6, 0.25, 16, 100); 
const material2 = new THREE.MeshNormalMaterial( { color: 0xffff00, wireframe: true} ); 
const torus = new THREE.Mesh( geometry2, material2 );
torus.position.set(-0.3,0,0);
scene.add(torus);

var step = 0;

function animate() {
	step += 0.01;
	requestAnimationFrame( animate );

	torus.rotation.y += 0.01;
	torus.rotation.x -= 0.01;
	torus.position.z = (Math.cos(step));

	tet.rotation.x+=0.01;
	tet.rotation.y+=0.01;

    ball.position.y = -0.2 + (1.5 * Math.abs(Math.sin(step)));
	ball.position.z = (1.2 * Math.cos(step));


	renderer.render( scene, camera );
}

animate();