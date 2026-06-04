import { camera } from './scene.js'
import { player, angle } from './player.js'



export function updateCamera() {
    camera.position.y = 4;
    camera.position.x = player.position.x + Math.sin(angle) * 5;
    camera.position.z = player.position.z + Math.cos(angle) * 5;
    camera.lookAt(player.position);

}
