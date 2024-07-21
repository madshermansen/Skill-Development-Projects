import { PolyhedronGeometry } from "three";
import * as THREE from "three";
import map from "./map.js";

const RADIUS = 1;
const INITAL_SPEED = 0.05;

export class Snus extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.CylinderGeometry( RADIUS, RADIUS, 1, 32 ); 

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,

      flatShading: true,
    });

    super(geometry, material);

    // Movement Properties
    this.speed = INITAL_SPEED; // Adjust as needed
    this.turnSpeed = 0.02; // Adjust as needed
    this.isMovingForward = true;
    this.isTurningLeft = false;
    this.isTurningRight = false;


    this.isJumping = false;
    this.velocity = new THREE.Vector3();
    this.gravity = 0.01; // Adjust as needed
    // add listeners (unchanged from your code)
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));

    this.rotation.z = Math.PI / 2;
  }

  onKeyDown(event) {
    switch (event.key.toLowerCase()) {
      case "w":
      case "arrowup":
        this.isMovingForward = true;
        break;
      case "a":
      case "arrowleft":
        this.isTurningLeft = true;
        break;
      case "d":
      case "arrowright":
        this.isTurningRight = true;
        break;
    }
  }
  onKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case "w":
      case "arrowup":
        // increase speed here?
        this.isMovingForward = true; // REMOVE THIS LINE
        break;
      case "a":
      case "arrowleft":
        this.isTurningLeft = false;
        break;
      case "d":
      case "arrowright":
        this.isTurningRight = false;
        break;
      case "s":
        case "arrowdown":
            this.isMovingForward = false;
            break;
      case " ": // Handle spacebar for jumping
        if (!this.isJumping) {
          console.log("Jumping");
          this.isJumping = true;
          this.velocity.y = 0.3; 
          this.speed += 0.1; 
        }
        break; // Important: Add a break statement for the spacebar case
    }
  }
  update() {
    const height = map.getCollisionHeight(this.position.x, this.position.z) + RADIUS;
    console.log(height);
    if (height && !this.isJumping) {
      this.position.y = height;
    }
    if (this.isMovingForward) {
      this.position.z += this.speed;
    }
    if (this.isTurningLeft) {

    }
    if (this.isTurningRight) {
        this.rotateY(-0.1);
    }
    if (this.isJumping) {
        // Apply gravity and update velocity
        this.velocity.y -= this.gravity; 
        this.position.add(this.velocity);
  
        // Check if the object is back on the "ground"
        if (this.position.y <= 0) {
          this.position.y = 0; // Reset position
          this.velocity.y = 0;  // Reset velocity
          this.speed = INITAL_SPEED; // Reset speed
          this.isJumping = false;
        }
      }
  }
}
