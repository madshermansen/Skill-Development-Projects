import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const CHUNK_SIZE = 100;
const SEGMENTS = 100;
const VISIBLE_DISTANCE = 2 * CHUNK_SIZE;

export class Map extends THREE.Mesh {
  constructor(size = 100, segments = 100) {
    super(
      new THREE.PlaneGeometry(size, size, segments, segments),
      new THREE.MeshStandardMaterial({ color: 0x90ee90 }) // Light green terrain
    );

    this.noise = createNoise2D();
    this.generateTerrain(); // Generate terrain on creation
    this.rotateX(-Math.PI / 2); // Rotate to lay flat
    this.chunks = {};
    this.noise = createNoise2D();
    this.generateInitialChunks();
  }

  generateTerrain() {
    const positionAttribute = this.geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);

      const y = positionAttribute.getY(i);

      const noiseValue = this.noise(x / 10, y / 10); // Scale down for smoother terrain

      positionAttribute.setZ(i, noiseValue);
    }

    positionAttribute.needsUpdate = true; // Signal geometry update

    // Add smoothing for nicer terrain (optional)

    this.geometry.computeVertexNormals();
  }

  generateChunk(x, z) {
    const chunkKey = `${x},${z}`;
    if (this.chunks[chunkKey]) return; // Chunk already exists

    const geometry = new THREE.PlaneGeometry(
      CHUNK_SIZE,
      CHUNK_SIZE,
      SEGMENTS,
      SEGMENTS
    );

    const material = new THREE.MeshStandardMaterial({ color: 0x90ee90 });
    const chunk = new THREE.Mesh(geometry, material);

    // Apply noise and position the chunk
    const positionAttribute = geometry.attributes.position;
    for (let i = 0; i < positionAttribute.count; i++) {
      const vx = positionAttribute.getX(i) + x;
      const vy = positionAttribute.getY(i) + z;
      const noiseValue = this.noise(vx / 10, vy / 10);
      positionAttribute.setZ(i, noiseValue);
    }
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    chunk.position.set(x, 0, z);
    chunk.rotateX(-Math.PI / 2);

    this.chunks[chunkKey] = chunk;
    return chunk;
  }

  getCollisionHeight(x, z) {
    const chunkCoordinates = this.convertToChunkCoordinates(x, z);
    const chunkKey = `${chunkCoordinates.x},${chunkCoordinates.z}`;
    const chunk = this.chunks[chunkKey];
    if (!chunk) return null; // No chunk found
    const localX = x - chunkCoordinates.x;
    const localZ = z - chunkCoordinates.z;
    const geometry = chunk.geometry;
    const width = geometry.parameters.width;
    const height = geometry.parameters.height;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const u = (localX + halfWidth) / width;
    const v = 1 - (localZ + halfHeight) / height;
    const i = Math.floor(u * SEGMENTS);
    const j = Math.floor(v * SEGMENTS);
    const index = i + j * (SEGMENTS + 1);
    const positionAttribute = geometry.attributes.position;
    return positionAttribute.getZ(index) + chunk.position.y;
  }

    getChunks() {
    return this.chunks;
    }
  convertToChunkCoordinates(x, z) {
    return {
      x: Math.floor(x / CHUNK_SIZE) * CHUNK_SIZE,
      z: Math.floor(z / CHUNK_SIZE) * CHUNK_SIZE,
    };
  }

  generateInitialChunks() {
    for (let x = -CHUNK_SIZE; x <= CHUNK_SIZE; x += CHUNK_SIZE) {
      for (let z = -CHUNK_SIZE; z <= CHUNK_SIZE; z += CHUNK_SIZE) {
        this.generateChunk(x, z);
      }
    }
  }

  update(camera) {
    const camX = camera.position.x;
    const camZ = camera.position.z;

    const startX = Math.floor((camX - VISIBLE_DISTANCE) / CHUNK_SIZE) * CHUNK_SIZE;
    const startZ = Math.floor((camZ - VISIBLE_DISTANCE) / CHUNK_SIZE) * CHUNK_SIZE;
    const endX = Math.floor((camX + VISIBLE_DISTANCE) / CHUNK_SIZE) * CHUNK_SIZE;
    const endZ = Math.floor((camZ + VISIBLE_DISTANCE) / CHUNK_SIZE) * CHUNK_SIZE;

    for (let x = startX; x <= endX; x += CHUNK_SIZE) {
      for (let z = startZ; z <= endZ; z += CHUNK_SIZE) {
        const chunkKey = `${x},${z}`;
        if (!this.chunks[chunkKey]) { // Check if chunk doesn't exist
          this.generateChunk(x, z);   // Only generate if new
        }
      }
    }
    // remove chunks that are too far away
    for (const chunkKey in this.chunks) {
      const [x, z] = chunkKey.split(",").map(Number);
      const distance = Math.sqrt((camX - x) ** 2 + (camZ - z) ** 2);
      if (distance > VISIBLE_DISTANCE + CHUNK_SIZE) {
        // Remove the chunk (add the code to remove it from your scene)
        delete this.chunks[chunkKey];
      }
    }
  }
}

const map = new Map();
export default map;
