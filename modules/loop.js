import { scene, camera, renderer } from './scene.js'
import { updatePlayer } from './player.js'
import { updateCamera } from './camera.js'
import { updateWave } from './wave.js'

export function loop() {
    requestAnimationFrame(loop);
    
    updatePlayer();
    updateCamera();
    updateWave();

    renderer.render(scene, camera);
}