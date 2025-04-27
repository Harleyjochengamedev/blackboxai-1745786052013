export class Leaderboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.apiUrl = 'http://localhost:3000/api/scores';
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Ranking de Pontuações</h2>
      <ul id="score-list" class="list-disc list-inside text-gray-700"></ul>
      <form id="score-form" class="mt-4">
        <input type="text" id="name-input" placeholder="Seu nome" required class="border p-2 rounded w-full mb-2" />
        <input type="number" id="points-input" placeholder="Sua pontuação" required class="border p-2 rounded w-full mb-2" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">Enviar Pontuação</button>
      </form>
    `;

    this.scoreList = this.container.querySelector('#score-list');
    this.scoreForm = this.container.querySelector('#score-form');
    this.nameInput = this.container.querySelector('#name-input');
    this.pointsInput = this.container.querySelector('#points-input');

    this.scoreForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitScore();
    });

    this.fetchScores();
  }

  async fetchScores() {
    try {
      const response = await fetch(this.apiUrl);
      const scores = await response.json();
      this.renderScores(scores);
    } catch (err) {
      console.error('Failed to fetch scores:', err);
    }
  }

  renderScores(scores) {
    this.scoreList.innerHTML = '';
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.name}: ${score.points} pontos`;
      this.scoreList.appendChild(li);
    });
  }

  async submitScore() {
    const name = this.nameInput.value.trim();
    const points = parseInt(this.pointsInput.value, 10);
    if (!name || isNaN(points)) {
      alert('Por favor, insira um nome válido e uma pontuação numérica.');
      return;
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, points }),
      });
      if (response.ok) {
        this.nameInput.value = '';
        this.pointsInput.value = '';
        this.fetchScores();
      } else {
        alert('Falha ao enviar a pontuação.');
      }
    } catch (err) {
      console.error('Error submitting score:', err);
      alert('Erro ao enviar a pontuação.');
    }
  }
}
