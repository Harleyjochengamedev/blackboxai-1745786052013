export class CreatorMode {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.objects = [];
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <p>Modo Criador: Monte seu próprio experimento físico.</p>
      <button id="add-block" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4">
        Adicionar Bloco
      </button>
      <div id="objects-list" class="mt-4"></div>
    `;

    this.objectsList = this.container.querySelector('#objects-list');
    this.container.querySelector('#add-block').addEventListener('click', () => this.addBlock());
  }

  addBlock() {
    const id = this.objects.length + 1;
    const newObj = {
      id,
      type: 'block',
      size: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: 0.1 * id, z: 0 },
      mass: 1,
      color: '#3b82f6', // Tailwind blue-500
    };
    this.objects.push(newObj);
    this.renderObjects();
  }

  renderObjects() {
    this.objectsList.innerHTML = '';
    this.objects.forEach(obj => {
      const div = document.createElement('div');
      div.className = 'mb-2 p-2 border rounded bg-gray-100 flex justify-between items-center';
      div.innerHTML = `
        <span>Objeto ${obj.id} - ${obj.type}</span>
        <button data-id="${obj.id}" class="remove-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Remover</button>
      `;
      this.objectsList.appendChild(div);
    });

    this.objectsList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.removeObject(id);
      });
    });
  }

  removeObject(id) {
    this.objects = this.objects.filter(obj => obj.id !== id);
    this.renderObjects();
  }
}
