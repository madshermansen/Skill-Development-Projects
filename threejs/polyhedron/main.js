import * as THREE from "three";
import { Snus } from "./snus.js";
import map from "./map.js";

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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

// Create and add the terrain map
// const map = new Map();
// scene.add(map.getMesh());

// Render loop
function animate() {
  map.update(camera);

  const chunks = map.getChunks();
  requestAnimationFrame(animate);
  snus.update();
  camera.position.set(
    snus.position.x - 30,
    snus.position.y + 20 - Math.abs(snus.velocity.z) * 100000,
    snus.position.z + 1
  );
  if (chunks) {
    console.log("chunks found");
    for (const chunkKey in chunks) { // Iterate over the keys of the dictionary
      const chunk = chunks[chunkKey]; // Get the chunk object using its key
      scene.add(chunk); // Add the chunk's mesh to
    }
  }
  snus.rotateY(0.1);
  camera.lookAt(snus.position);
  //   camera.fov = 30 + Math.abs(snus.velocity.z) * 1000;
  //   camera.updateProjectionMatrix();
  // snus.position.y = snusGeometry.positionInfo.position.y;
  renderer.render(scene, camera);
}

animate();
