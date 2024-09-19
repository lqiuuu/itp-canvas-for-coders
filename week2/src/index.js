import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

// vector
const myVector = new THREE.Vector3(1, 2, 3);
console.log("myVector:", myVector);

// color
const myColor = new THREE.Color("blue");
console.log("myColor:", myColor);

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("cornflowerblue");
// scene.fog = new THREE.FogExp2(0x000000, 0.0007); //fades in and out

// perspective camera ( fov, aspect, near, far )
// const camera = new THREE.PerspectiveCamera(
//   60,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   3000
// );
// orthographic camera ( left, right, top, bottom, near, far ) based of a plane box
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -5,
  window.innerWidth / 5,
  window.innerHeight / 5,
  window.innerHeight / -5,
  0,
  3000
);
camera.position.set(0, 100, 400);
camera.lookAt(0, 100, 0);

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.y = 0.01; // above the ground slightly
// scene.add(axesHelper);

// ambient light
<<<<<<< HEAD
const ambientLight = new THREE.AmbientLight("palevioletred", 0.1); //(color, intensity)
=======
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.1);
>>>>>>> 9972f79419cd843bb9940e70121c45fa677d08a3
scene.add(ambientLight);
console.log("ambientLight", ambientLight);

// directional light, supports shadow
const dirLight = new THREE.DirectionalLight("royalblue");
dirLight.position.set(-100, 100, 0);
scene.add(dirLight);
const dirLighthelper = new THREE.DirectionalLightHelper(dirLight, 10); //show where it comes from
// scene.add(dirLighthelper);

// point light ( color, intensity, distance, decay )
const pointLight = new THREE.PointLight("salmon", 2, 200, 0.1);
pointLight.position.set(0, 200, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// area light ( color, intensity, width, height )
// const rectLight = new THREE.RectAreaLight("plum", 3, 200, 100);
// rectLight.position.set(0, 50, 200);
// rectLight.lookAt(0, 100, 0);
// scene.add(rectLight);
// const rectLightHelper = new RectAreaLightHelper(rectLight);
// scene.add(rectLightHelper);

// spot light ( color, intensity, distance, angle, penumbra, decay )
const spotLight = new THREE.SpotLight("greenyellow", 3);
spotLight.distance = 300;
spotLight.angle = Math.PI * 0.1;
spotLight.penumbra = 0.3;
spotLight.decay = 0.1;
spotLight.position.set(100, 220, -200);
spotLight.target.position.set(-50, 0, 0);
scene.add(spotLight, spotLight.target);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// hemisphere light ( skyColor, groundColor, intensity )
const hemiLight = new THREE.HemisphereLight("peachpuff", "tomato", 1); //top bottom
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);
const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
// scene.add(hemiLightHelper);

// control
const controls = new OrbitControls(camera, renderer.domElement); // orbit control
// const controls = new MapControls(camera, renderer.domElement); // map control
controls.enableDamping = true; //ease in & out
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; //retains y axis
controls.enableRotate = true;
// controls.enableRotateX = false;
// controls.enableRotateZ = false;
controls.rotateSpeed = 0.3; //intensity
controls.enableZoom = false; //default true
controls.zoomSpeed = 0.5; //scroll
controls.minDistance = 10; //zoom in default infinite, a min zoom in level set
controls.maxDistance = 1000; //max how the zoom goes
controls.maxPolarAngle = Math.PI * 0.4;
controls.minPolarAngle = Math.PI * 0.4;
// controls.minPolarAngle = Math.PI/2;
// controls.maxPolarAngle = Math.PI/2;
controls.target = new THREE.Vector3(0, 100, 0);

<<<<<<< HEAD
// // first person control, fly control
=======
// // FirstPersonControl
>>>>>>> 9972f79419cd843bb9940e70121c45fa677d08a3
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 100;
// controls.lookSpeed = 0.02;
// const clock = new THREE.Clock(); // requires delta time value in update(), should pass this delta time by default

/**
 * ----------------------------------------------------------------------------------------
 * objects, you don't need to modify for week2
 */

// ground
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8,
  metalness: 0.2,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI * 0.5;
scene.add(groundMesh);

// spheres
const geometry = new THREE.SphereGeometry(5, 128, 128);
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
// for (let i = 0; i < 30; i++) {
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.position.z = -i * 100;
//   scene.add(mesh);
// }

// big sphere
const sphereMesh = new THREE.Mesh(geometry, material);
sphereMesh.position.y = 100;
sphereMesh.scale.setScalar(5);
scene.add(sphereMesh);

/**
 * ----------------------------------------------------------------------------------------
 */

// resize, callback function
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // camera.left = window.innerWidth / -2; // orthographic camera
  // camera.right = window.innerWidth / 2; // orthographic camera
  // camera.top = window.innerHeight / 2; // orthographic camera
  // camera.bottom = window.innerHeight / -2; // orthographic camera
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize); //javascript thing, fires whenever you resizes

// animate
const animate = () => {
  controls.update();
  // controls.update(clock.getDelta()); // for first person control

  renderer.render(scene, camera); //render the scene
  requestAnimationFrame(animate);
};

animate();
