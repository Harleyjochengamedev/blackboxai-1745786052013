import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

let model;

export async function setupML() {
  model = await cocoSsd.load();
  console.log('COCO-SSD model loaded.');

  // Start video stream from camera
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.style.display = 'none';
  document.body.appendChild(video);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing camera for ML:', err);
    return;
  }

  video.onloadedmetadata = () => {
    video.play();
    detectFrame(video);
  };
}

async function detectFrame(video) {
  if (!model) return;

  const predictions = await model.detect(video);

  // For now, just log detected objects
  if (predictions.length > 0) {
    console.log('Detected objects:', predictions);
  }

  requestAnimationFrame(() => detectFrame(video));
}
