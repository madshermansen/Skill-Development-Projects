import * as THREE from 'three';
import { Snus } from './snus.js';

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry from Snus class
const snusGeometry = new Snus();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const snus = new THREE.Mesh(snusGeometry, material);

scene.add(snus);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();