import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import {player} from './player.js'
import {scene} from './scene.js'
import {tiles} from './tiles.js'

let state = "wait";
let falling = false;
let timer = 0;
let wave = 1;
let waveMesh = null;
let yaywinner = document.getElementById("yaywinner")

let playerColour = 0xffff00;
const palette = [
    0xffd6a5,
    0xfdffb6,
    0xcaffbf,
    0x9bf6ff,
    0xa0c4ff,
    0xbdb2ff,
    0xf04f5a
];

export function startWave() {
    console.log(3);
    
    state = "wait";
    timer = 0;
    player.position.y = 0.6;
    player.position.x = 0;
    player.position.z = 4
    resetTiles();
    createWaveNum()
    playerColour = palette[Math.floor(Math.random() * palette.length)];
    player.material.color.setHex(playerColour);
    player.material.emissive.setHex(playerColour);
}


function createWaveNum() {
    if (waveMesh) {
        scene.remove(waveMesh);
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 640;
    canvas.height = 160;
    ctx.fillStyle = "rgba(0,0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "700 100px Nunito";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("round " + wave + "😡", canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, color: 0xffffff });
    waveMesh = new THREE.Sprite(material);
    waveMesh.scale.set(5, 1.25, 1);
    waveMesh.position.set(0, 1, 0);
    scene.add(waveMesh);

}


export function changeTilesColour() {
    let targetColour = playerColour;
    tiles.forEach(function (t) {
        let colour = palette[Math.floor(Math.random() * palette.length)];
        const chance = Math.max(0.02, 0.2 - wave * 0.01);
        if (chance == 0.17){
            yaywinner.style.opacity = 1;
        }
        let isMatch = Math.random() < chance;
        t.color = isMatch ? "match" : "mismatch";
        colour = isMatch ? targetColour : palette[Math.floor(Math.random() * palette.length)];
        if (isMatch) {
            colour = targetColour;
        }
        else {
            let colourId = palette.indexOf(targetColour);
            let randomColour = palette[Math.floor(Math.random() * palette.length)];
            if (randomColour === targetColour) {
                colour = palette[(colourId + 1) % palette.length];

            }
            else {
                colour = randomColour;
            }
        }
        t.mesh.material.color.setHex(colour);
        t.mesh.material.emissive.setHex(colour);
        t.mesh.material.emissiveIntensity = 0.2;
    })
}


function resetTiles() {
    tiles.forEach(function (t) {
        t.mesh.material.color.setHex(0xfafafa)
        t.mesh.material.emissive.setHex(0x000000)
        t.mesh.visible = true;
        t.color = "gray"
    })
}


export function fall() {
    if (falling) {
        return;
    }
    state = "fall";
    falling = true;
    let velocity = 0.1
    wave = 1;
    createWaveNum();
    function drop() {
        player.position.y -= velocity;
        velocity += 0.01;
        if (player.position.y < -10) {
            falling = false;
            startWave();
            return;
        }
        requestAnimationFrame(drop)
    }
    drop()
}


function check() {
    let win = false
    tiles.forEach(function (t) {
        let dx = Math.abs(player.position.x - t.x);
        let dz = Math.abs(player.position.z - t.z);
        if (dx < 0.6 && dz < 0.6 && t.color == "match") {
            win = true;
        }
    })
    tiles.forEach(function (t) {
        if (t.color === "mismatch") {
            t.mesh.visible = false;
        }
    })
    if (win) {
        setTimeout(function () {
            wave++;
            startWave();
        }, 2000)

    }
    else {
        fall()
    }
}

export function updateWave() {
    console.log(4);
    
    if (state == "wait") {
        timer++;
        if (timer > 320) {
            state = "play";
            timer = 0;
            changeTilesColour();
        }
    }
    if (state == "play") {
        timer++;
        if (timer > 320) {
            timer = 0;
            check();
        }
    }
}