import { fall } from './wave.js'
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from './scene.js'
import {tiles} from './tiles.js'

export const player = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1, 0.6),
    new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.7,
        roughness: 0.3
    })
);

export let angle = 0;

const keys = {};
const speed = 0.05;
document.onkeydown = e => keys[e.key] = true;
document.onkeyup = e => keys[e.key] = false;

export function updatePlayer() {
    console.log(2);
    
    if (keys.w) {
        player.position.z -= Math.cos(angle) * speed;
        player.position.x -= Math.sin(angle) * speed;
    }

    if (keys.s) {
        player.position.z += Math.cos(angle) * speed;
        player.position.x += Math.sin(angle) * speed;
    }
    if (keys.a) angle += 0.05
    if (keys.d) angle -= 0.05
    player.rotation.y = angle;
    let isOnVisible = false;
    tiles.forEach(function (t) {
        let dx = Math.abs(player.position.x - t.x);
        let dz = Math.abs(player.position.z - t.z);
        if (dx < 0.6 && dz < 0.6 && t.mesh.visible) {
            isOnVisible = true;
        }
    })
    if (isOnVisible == false) {
        fall()

    }
}



player.position.y = 0.6;
player.position.z = 4;

player.castShadow = true;

scene.add(player);