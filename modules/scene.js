import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x070a12);

await document.fonts.load("900 220px Nunito");
export const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);

export const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const key = new THREE.DirectionalLight(0xffffff, 1.2);

key.position.set(5, 10, 5);
key.castShadow = true;

scene.add(key);

const rim = new THREE.DirectionalLight(0x88aaff, 0.3);
rim.position.set(-5, 3, -5);
scene.add(rim);

scene.add(new THREE.HemisphereLight(0x9fd3ff, 0x1a1a2e, 0.5));