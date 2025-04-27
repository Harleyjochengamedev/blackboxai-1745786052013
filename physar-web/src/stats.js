export class StatsPanel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.stats = {
      velocity: 0,
      acceleration: 0,
      energy: 0,
    };
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <p>Velocidade: <span id="velocity">0</span> m/s</p>
      <p>Aceleração: <span id="acceleration">0</span> m/s²</p>
      <p>Energia: <span id="energy">0</span> J</p>
    `;
  }

  update(velocity, acceleration, energy) {
    this.stats.velocity = velocity;
    this.stats.acceleration = acceleration;
    this.stats.energy = energy;

    this.container.querySelector('#velocity').textContent = velocity.toFixed(2);
    this.container.querySelector('#acceleration').textContent = acceleration.toFixed(2);
    this.container.querySelector('#energy').textContent = energy.toFixed(2);
  }
}
