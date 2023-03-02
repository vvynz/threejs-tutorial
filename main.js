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

//create an object
// 1. geometry - a set of vectors that define an object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// material - like the wrapping paper for an object
// most material will require a light source to bounce off of but we'll go with the basic option that won't req a light source
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

renderer.render(scene, camera);