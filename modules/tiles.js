import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from './scene.js'

const size = 10;
const tileSize = 1.2;
export const tiles = [];
const floor = new THREE.Group();
scene.add(floor);

function makeTile(x, z) {

    const geo = new THREE.BoxGeometry(1, 0.1, 1);

    const mat = new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        roughness: 0.5,
        metalness: 0.1
    });

    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(x, 0, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    floor.add(mesh);

    tiles.push({ mesh, x, z, color: "gray" });
}

for (let i = -size; i <= size; i++) {
    for (let j = -size; j <= size; j++) {
        makeTile(i * tileSize, j * tileSize);
    }
}