import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";

// app
const app = document.querySelector(".diagram");

// renderer
const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
  // canvas: document.querySelector(".diagram"),
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(150, 150);
renderer.setClearColor( 0x000000, 0 );
app.appendChild(renderer.domElement);

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
// scene.background = new THREE.Color( 0x000000, 0 );

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 0, 200);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);


// object
const geometry = new THREE.IcosahedronGeometry(30,0);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 5;
// scene.add(mesh);

// floor
// const floorGeometry = new THREE.PlaneGeometry(30, 30);
// const floorMesh = new THREE.Mesh(floorGeometry, material);
// floorMesh.rotation.x = -Math.PI * 0.5;
// floorMesh.position.y = 0;
// scene.add(floorMesh);

/**
 * 3D Model
 */

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
  // resource URL
  "/mushroom1.glb",
  // called when the resource is loaded
  function (gltf) {
    console.log(`mushroom1 gltf: `, gltf);

    scene.add(gltf.scene);

    gltf.scene.position.y = -80;
    gltf.scene.scale.setScalar(200);

    gltf.scene.traverse(function (el) {
      console.log("traverse: ", el);

      if (el.isMesh) {
        console.log("isMesh: ", el);
      }
    });
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);


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


gsap.to('#app', {
  y: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});