export class Quiz {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.questions = [
      {
        question: "Qual força é necessária para mover um bloco de 5kg com aceleração de 2m/s²?",
        options: ["5 N", "10 N", "15 N", "20 N"],
        answer: 1,
      },
      {
        question: "Qual é a trajetória de um objeto em movimento parabólico?",
        options: ["Linha reta", "Círculo", "Parábola", "Elipse"],
        answer: 2,
      },
      // Add more questions as needed
    ];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.showQuestion();
  }

  showQuestion() {
    const q = this.questions[this.currentQuestionIndex];
    const questionElem = document.createElement('div');
    questionElem.className = 'mb-4';
    questionElem.innerHTML = `<h3 class="text-lg font-semibold mb-2">${q.question}</h3>`;

    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'block w-full text-left px-4 py-2 mb-2 bg-gray-200 rounded hover:bg-gray-300';
      btn.textContent = option;
      btn.onclick = () => this.checkAnswer(index);
      questionElem.appendChild(btn);
    });

    this.container.appendChild(questionElem);
  }

  checkAnswer(selectedIndex) {
    const q = this.questions[this.currentQuestionIndex];
    if (selectedIndex === q.answer) {
      this.score++;
      alert('Resposta correta!');
    } else {
      alert('Resposta incorreta.');
    }
    this.currentQuestionIndex++;
    this.container.innerHTML = '';
    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.container.innerHTML = `<h3 class="text-xl font-bold">Quiz finalizado!</h3>
      <p class="mt-2">Sua pontuação: ${this.score} de ${this.questions.length}</p>`;
  }
}
