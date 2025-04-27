import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { PhysicsWorld } from './physics.js';
import { setupML } from './ml.js';
import { Quiz } from './quiz.js';
import { StatsPanel } from './stats.js';
import { CreatorMode } from './creator.js';
import { Leaderboard } from './leaderboard.js';

let camera, scene, renderer;
let physicsWorld;
let quiz;
let statsPanel;
let creatorMode;
let leaderboard;

init();
animate();

function init() {
  const container = document.getElementById('ar-container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    0.01,
    20
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

  physicsWorld = new PhysicsWorld(scene);

  setupML();

  quiz = new Quiz('quiz-content');

  const startQuizBtn = document.getElementById('start-quiz');
  startQuizBtn.addEventListener('click', () => {
    document.getElementById('quiz-mode').classList.remove('hidden');
    quiz.init();
  });

  statsPanel = new StatsPanel('stats-content');

  // For demo, show stats panel and update with dummy data
  const statsSection = document.getElementById('stats-panel');
  statsSection.classList.remove('hidden');

  // Example update loop for stats (replace with real data)
  setInterval(() => {
    const velocity = Math.random() * 10;
    const acceleration = Math.random() * 5;
    const energy = Math.random() * 100;
    statsPanel.update(velocity, acceleration, energy);
  }, 1000);

  creatorMode = new CreatorMode('creator-content');

  const creatorSection = document.getElementById('creator-mode');
  creatorSection.classList.remove('hidden');

  leaderboard = new Leaderboard('leaderboard');

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const container = document.getElementById('ar-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
  if (physicsWorld) {
    physicsWorld.update();
  }
  renderer.render(scene, camera);
}
