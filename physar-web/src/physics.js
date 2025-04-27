import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export class PhysicsWorld {
  constructor(scene) {
    this.scene = scene;
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;

    this.objects = [];

    this.initGround();
  }

  initGround() {
    // Create a ground plane in physics and three.js
    const groundBody = new CANNON.Body({
      mass: 0, // static
      shape: new CANNON.Plane(),
      material: new CANNON.Material({ friction: 0.5, restitution: 0.3 }),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(groundBody);

    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);
  }

  addBox(position, size, mass = 1, color = 0x00ff00) {
    // Create physics body
    const shape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));
    const body = new CANNON.Body({ mass, shape });
    body.position.set(position.x, position.y, position.z);
    this.world.addBody(body);

    // Create three.js mesh
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    this.scene.add(mesh);

    this.objects.push({ body, mesh });
  }

  update() {
    const delta = 1 / 60;
    this.world.step(delta);

    // Sync three.js meshes with physics bodies
    this.objects.forEach(({ body, mesh }) => {
      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);
    });
  }
}
