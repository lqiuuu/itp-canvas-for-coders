import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// perspective camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(20, 10, 20);

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.y = 0.001; // above the ground slightly
scene.add(axesHelper);

// grid helper
const gridHelper = new THREE.GridHelper(100, 100, "#444444", "#cccccc");
scene.add(gridHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const m1 = new THREE.MeshBasicMaterial({
  color: "mediumslateblue"
});
const m2 = new THREE.MeshBasicMaterial({
  color: "lawngreen"
});

const m3 = new THREE.MeshBasicMaterial({
  color: "yellow"
});

const m4 = new THREE.MeshBasicMaterial({
  color: "white"
});

const m5 = new THREE.MeshBasicMaterial({
  color: "hotpink"
});

const m6 = new THREE.MeshBasicMaterial({
  color: "salmon"
});
// const boxMesh = new THREE.Mesh(boxGeometry, material);
// scene.add(boxMesh);
let material = [m1, m2, m3, m4, m5, m6];

for (let i = 0; i < 3; i++){
  for (let j = 0; j < 3; j++){
    for (let k = 0; k < 3; k++){
  const boxMesh = new THREE.Mesh(boxGeometry, material);
  boxMesh.position.x = i * 0.1 + i;
  boxMesh.position.y = j * 0.1 + j;
  boxMesh.position.z = k * 0.1 + k;
  scene.add(boxMesh);
    }
  }
}

const innerboxG = new THREE.BoxGeometry(3,3,3);
const mi = new THREE.MeshBasicMaterial({
  color: "black"
});
const innerbox = new THREE.Mesh(innerboxG, mi);
scene.add(innerbox);
innerbox.position.x = 1.1;
innerbox.position.y = 1.1;
innerbox.position.z = 1.1;

//not really working
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial();

// function newCube(x, y, z){
//   const cubeMesh = new THREE.Mesh(cubeGeometry, material);
//   cubeMesh.position = new THREE.Vector3(x, y, z);
//   scene.add(cubeMesh);
// }
//   for (let i = 0; i < 3; i++){
//       for (let j = 0; j < 3; j++){
//         for (let k = 0; k < 3; k++){
//       // const boxMesh = new THREE.Mesh(boxGeometry, material);
//       var x = i * 0.1 + i;
//       var y = j * 0.1 + j;
//       var z = k * 0.1 + k;
      
//       newCube(x, y, z);
//         }
//       }
//     }
    

// group
const earthGroup = new THREE.Group();

// animate
const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();
