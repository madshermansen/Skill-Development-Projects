import * as THREE from 'three';

export class Map extends THREE.Mesh{
  constructor(size = 100, segments = 10000) {
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    super(geometry, new THREE.MeshLambertMaterial({ color: 0x00ffff, wireframe: false }));
    this.size = size;
    this.segments = segments;
    this.generateTerrain();
  }

  generateTerrain() {
    const vertices = this.geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 5; // Simple height function
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }

    getMesh() {
        const terrain = new THREE.Mesh(this.geometry, this.material);
        terrain.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
        return terrain;
    }
}
