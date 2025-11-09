import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as rutas } from './rutas.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const cliente = path.resolve(__dirname, '..', '..', 'cliente');

const app = express();
const PORT = 3000;
const CORS_ORIGIN = '*';

app.use(cors({ origin: CORS_ORIGIN, credentials: false }));
app.use(express.json());

app.use('/api/tareas', rutas);

app.use(express.static(cliente));

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});