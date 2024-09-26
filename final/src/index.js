import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// app
// const app = document.querySelector(".app canvas");

// renderer
const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
  canvas: document.querySelector(".diagram canvas"),
  alpha: true
});
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// app.appendChild(renderer.domElement);

//canvas
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
  }
}

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 50, 200);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

// object
const geometry = new THREE.IcosahedronGeometry(20,0);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 5;
scene.add(mesh);

// floor
// const floorGeometry = new THREE.PlaneGeometry(30, 30);
// const floorMesh = new THREE.Mesh(floorGeometry, material);
// floorMesh.rotation.x = -Math.PI * 0.5;
// floorMesh.position.y = 0;
// scene.add(floorMesh);

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onResize);

// animate
const animate = () => {
  resizeCanvasToDisplaySize()
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();
