// const API = 'http://localhost:3000/api'; // para uso local 
const API = 'https://dev-webs-1.onrender.com'; // para uso en produccion

const form = document.getElementById('formularioTareas');
const titulo = document.getElementById('titulo');
const list = document.getElementById('lista');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = titulo.value.trim();
  if (!text) return;
  await fetch(`${API}/tareas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titulo: text }) });
  titulo.value = '';
  await cargarTareas();
});

async function cargarTareas() {
  const r = await fetch(`${API}/tareas`);
  const items = await r.json();
  list.innerHTML = '';
  for (const t of items) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'tarea-titulo' + (t.completado ? ' completado' : '');
    span.textContent = t.titulo;
    const btn = document.createElement('button');
    btn.textContent = t.completado ? 'Reabrir' : 'Completar';
    btn.addEventListener('click', async () => {
      await fetch(`${API}/tareas/${t.id}/completado`, { method: 'PATCH' });
      await cargarTareas();
    });
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }
}
cargarTareas().catch(console.error);