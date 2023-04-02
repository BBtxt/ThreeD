import "./style.css"
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene();
// scene.background = new THREE.setClearColor(0xffff12)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') , alpha: true
});

//------render--------------------------//

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(50);

renderer.render(scene, camera);


//---------------- Lighting--------------------// 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10,0,0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//---------Light position helper-----------------///
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(100, 50)

// scene.add(lightHelper, gridHelper)

//----------controls----------------//
const controls = new OrbitControls(camera, renderer.domElement);
// controls.keys = {
  // 	LEFT: 'ArrowLeft', //left arrow
  // 	UP: 'ArrowUp', // up arrow
  // 	RIGHT: 'ArrowRight', // right arrow
  // 	BOTTOM: 'ArrowDown' // down arrow
  // }
  
  //----------- planets --------------------------//
  const planetGeometry = new THREE.SphereGeometry(5,32,16)
  const planetMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const sphere = new THREE.Mesh( planetGeometry, planetMaterial );
  scene.add( sphere );
  
  const geometryRing = new THREE.TorusGeometry(10,1,16,100);
  const ringMaterial = new THREE.MeshStandardMaterial( { color: 0xFF6348 });
  const torus = new THREE.Mesh( geometryRing, ringMaterial)
  
  scene.add(torus)
  
  //----------- Stars -------------//
  function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xE3ECED})
  const Star = new THREE.Mesh( geometry, material );

  const [x, y, z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));

  Star.position.set(x,y,z);
  scene.add(Star)

}

Array(200).fill().forEach(addStar)


//keeps freaking the animation
function animate() {
  requestAnimationFrame( animate );  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  controls.update()
  renderer.render( scene, camera );
  
} 

animate()