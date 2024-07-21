import * as THREE from 'three';
import { Snus } from './snus.js';
import { Map } from './map.js';

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const snus = new Snus();
scene.add(snus);

const map = new Map();
scene.add(map.getMesh());


// Create and add the terrain map
// const map = new Map();
// scene.add(map.getMesh());

camera.position.set(0, 10, 50);
camera.lookAt(0, 0, 0);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  snus.update();
  // snus.position.y = snusGeometry.positionInfo.position.y;
  renderer.render(scene, camera);
}

animate();
