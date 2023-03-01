import "./style.css";

import * as THREE from "three";

// scene is like a container that holds all your objects, cameras and lights
const scene = new THREE.Scene();

// perspective camera is the most commonly used. It mimics what the human eye sees
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);