import { player } from './player.js'
import {game} from './gamestate.js'
import {resetWave, startWave} from './wave.js'

export function fall() {
    if (game.falling) {
        return;
    }
    game.state = "fall";
    game.falling = true;
    let velocity = 0.1;
    resetWave();
    function drop() {
        player.position.y -= velocity;
        velocity += 0.01;
        if (player.position.y < -10) {
            game.falling = false;
            startWave();
            return;
        }
        requestAnimationFrame(drop)
    }
    drop()
}