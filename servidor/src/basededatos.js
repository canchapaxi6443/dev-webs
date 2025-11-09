import 'dotenv/config';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const ARCHIVO = './db/basededatos.db';
const ruta = path.dirname(ARCHIVO);
if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });

export const basededatos = new Database(ARCHIVO);

basededatos.exec(`
CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  completado INTEGER NOT NULL DEFAULT 0 CHECK (completado IN (0,1)),
  created_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
`);
