import { Router } from 'express';
import { basededatos } from './basededatos.js';

export const router = Router();

router.get('/', (req, res) => {
  const rows = basededatos.prepare(`
    SELECT id, titulo as titulo, completado, created_at
    FROM tareas ORDER BY id DESC`
  ).all();
  res.json(rows.map(r => ({ ...r, completado: !!r.completado })));
});

router.post('/', (req, res) => {
  const { titulo } = req.body || {};
  if (!titulo || !titulo.trim()) return res.status(400).json({ error: 'titulo requerido' });
  const info = basededatos.prepare('INSERT INTO tareas (titulo) VALUES (?)').run(titulo.trim());
  const row = basededatos.prepare(`
    SELECT id, titulo, completado, created_at
    FROM tareas WHERE id = ?
  `).get(info.lastInsertRowid);
  res.status(201).json({ ...row, done: !!row.done });
});

router.patch('/:id/completado', (req, res) => {
  const id = Number(req.params.id);
  const row = basededatos.prepare('SELECT id, completado FROM tareas WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'No existe tarea' });
  const newVal = row.completado ? 0 : 1;
  basededatos.prepare('UPDATE tareas SET completado = ? WHERE id = ?').run(newVal, id);
  const updated = basededatos.prepare(`
    SELECT id, titulo, completado, created_at
    FROM tareas WHERE id = ?
  `).get(id);
  res.json({ ...updated, done: !!updated.done });
});
