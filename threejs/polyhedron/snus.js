import { PolyhedronGeometry } from "three";

export class Snus extends PolyhedronGeometry {
  constructor() {
    // Define vertices for the thin cylinder
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

    super(vertices, indices);
    this.name = "Snus";
  }
}
