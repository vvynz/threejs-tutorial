import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });

// MeshStandardMaterial is a material that will react to light boucing off of it
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

// our object/shape
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// point light will emits a light in all directions
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5); // lights up the middle of the torus

const ambientLight = new THREE.AmbientLight(0xffffff); // like a flood light that'll light up everything in the scene
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper); // will show a little wireframe that shows the position & direction of light source

// will listen to dom events on the mouse and update accordingly
const controls = new OrbitControls(camera, renderer.domElement);

// will generate a random num of stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(200).fill().forEach(addStar);

// our background
const spaceTexture = new THREE.TextureLoader().load("/assets/space.jpg");
scene.background = spaceTexture;

// a recursive function that while create an endless loop that calls the rendering function automatically
function animate() {
  requestAnimationFrame(animate);

  // when we change the shape/obj's properties in the loop, the shape will animate
  // ex. we want to rotate the shape on the x axis by 0.01 sec per animation frame
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

// Moon

const moonTexture = new THREE.TextureLoader().load("/assets/moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("/assets/normal.jpeg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon);