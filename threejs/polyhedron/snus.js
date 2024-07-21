import { PolyhedronGeometry } from "three";
import * as THREE from 'three';


export class Snus extends THREE.Mesh {
  constructor() {
    const vertices = [
        // Top circle vertices
        1, 0, 0.1, 0.707, 0.707, 0.1, 0, 1, 0.1, -0.707, 0.707, 0.1, -1, 0, 0.1,
        -0.707, -0.707, 0.1, 0, -1, 0.1, 0.707, -0.707, 0.1,
        // Bottom circle vertices
        1, 0, -0.1, 0.707, 0.707, -0.1, 0, 1, -0.1, -0.707, 0.707, -0.1, -1, 0,
        -0.1, -0.707, -0.707, -0.1, 0, -1, -0.1, 0.707, -0.707, -0.1,
      ];
  
      // Define faces of the thin cylinder
      const indices = [
        // Top circle faces
        0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 1,
        // Bottom circle faces
        8, 9, 10, 8, 10, 11, 8, 11, 12, 8, 12, 13, 8, 13, 14, 8, 14, 15, 8, 15, 9,
        // Side faces
        0, 1, 9, 0, 9, 8, 1, 2, 10, 1, 10, 9, 2, 3, 11, 2, 11, 10, 3, 4, 12, 3,
        12, 11, 4, 5, 13, 4, 13, 12, 5, 6, 14, 5, 14, 13, 6, 7, 15, 6, 15, 14, 7,
        0, 8, 7, 8, 15,
      ];
    const geometry = new PolyhedronGeometry(vertices, indices, 1, 0);

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      flatShading: true
    });

    super(geometry, material);
    this.velocity = new THREE.Vector3(0, 0, 0);
    // add listeners
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  jump() {
    this.velocity.y = 0.2;
  }

  updateJump() {
    this.position.y += this.velocity.y;
    if (this.position.y < 0) {
      // decrease the velocity
      this.velocity.y -= 0.01;
    } else {
        this.position.y = 0;
        this.velocity.y = 0;
    }
    console.log(this.position.y);
    }

    update() {
        this.updateJump();
        this.position.add(this.velocity);
    }

    moveLeft() {
        this.velocity.x = -0.1;
    }

    moveRight() {
        this.velocity.x = 0.1;
    }

    moveForward() {
        this.velocity.z = -0.1;
    }

    moveBackward() {
        this.velocity.z = 0.1;
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.moveForward();
                break;
            case 's':
                this.moveBackward();
                break;
            case 'a':
                this.moveLeft();
                break;
            case 'd':
                this.moveRight();
                break;
            case ' ':
                this.jump();
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'w':
            case 's':
                this.velocity.z = 0;
                break;
            case 'a':
            case 'd':
                this.velocity.x = 0;
                break;
        }
    }
}
