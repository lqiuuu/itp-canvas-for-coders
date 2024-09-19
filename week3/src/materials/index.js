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
scene.add(axesHelper);

// lights
const ambientLight = new THREE.AmbientLight("white", 2);
const directionalLight = new THREE.DirectionalLight("#ccc", 2);
directionalLight.position.set(-10, 10, 10);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(ambientLight, directionalLight, directionalLightHelper);

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

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// geometry
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);

// MeshNormalMaterial
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(mesh1);

// MeshBasicMaterial
const mesh2 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    color: "#0000ff",
  })
);
mesh2.position.z = -5;
scene.add(mesh2);

// MeshPhongMaterial
const mesh3 = new THREE.Mesh(
  geometry,
  new THREE.MeshPhongMaterial({
    color: "#0000ff",
    shininess: 80,
    specular: "#cccccc",
  })
);
mesh3.position.z = -10;
scene.add(mesh3);

// MeshStandardMaterial
const mesh4 = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    color: "#0000ff",
    roughness: 0.8,
    metalness: 0.2,
  })
);
mesh4.position.z = -15;
scene.add(mesh4);

// MeshPhysicalMaterial
const mesh5 = new THREE.Mesh(
  geometry,
  new THREE.MeshPhysicalMaterial({
    color: "#0000ff",
    roughness: 0.8,
    metalness: 0.2,
    reflectivity: 0.7,
    clearcoat: 0.3,
    side: THREE.DoubleSide,
  })
);
mesh5.position.z = -20;
scene.add(mesh5);

// double sided
const mesh6 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3),
  new THREE.MeshStandardMaterial({
    color: "#0000ff",
    roughness: 0.8,
    metalness: 0.2,
    side: THREE.DoubleSide,
  })
);
mesh6.position.z = -25;
scene.add(mesh6);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// animate
const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();
