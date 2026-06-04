import "./modules/player.js"
import { startWave} from "./modules/wave.js"

import { loop } from './modules/loop.js'
import { camera, renderer } from './modules/scene.js'


 
console.log(1);
startWave();

loop();



addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});