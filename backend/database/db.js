import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'data.json');

// Estructura inicial de la base de datos
const initialDB = {
  users: [],
  posts: [],
  chats: []
};

// Crear archivo de base de datos si no existe
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2));
}

// Leer base de datos
export const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo base de datos:', error);
    return initialDB;
  }
};

// Escribir base de datos
export const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error escribiendo base de datos:', error);
    return false;
  }
};

// Generar ID único
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Operaciones CRUD genéricas
export const findOne = (collection, query) => {
  const db = readDB();
  return db[collection].find(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
};

export const find = (collection, query = {}) => {
  const db = readDB();
  if (Object.keys(query).length === 0) {
    return db[collection];
  }
  return db[collection].filter(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
};

export const create = (collection, data) => {
  const db = readDB();
  const newItem = {
    _id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db[collection].push(newItem);
  writeDB(db);
  return newItem;
};

export const updateOne = (collection, query, update) => {
  const db = readDB();
  const index = db[collection].findIndex(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
  
  if (index !== -1) {
    db[collection][index] = {
      ...db[collection][index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    writeDB(db);
    return db[collection][index];
  }
  return null;
};

export const deleteOne = (collection, query) => {
  const db = readDB();
  const index = db[collection].findIndex(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
  
  if (index !== -1) {
    const deleted = db[collection].splice(index, 1)[0];
    writeDB(db);
    return deleted;
  }
  return null;
};

export const populate = (item, populateFields) => {
  const db = readDB();
  const populated = { ...item };
  
  populateFields.forEach(field => {
    if (field.path && field.collection) {
      if (Array.isArray(populated[field.path])) {
        populated[field.path] = populated[field.path].map(id => {
          const found = db[field.collection].find(doc => doc._id === id);
          if (found && field.select) {
            const selected = {};
            field.select.split(' ').forEach(key => {
              selected[key] = found[key];
            });
            return { _id: found._id, ...selected };
          }
          return found;
        }).filter(Boolean);
      } else if (populated[field.path]) {
        const found = db[field.collection].find(doc => doc._id === populated[field.path]);
        if (found && field.select) {
          const selected = {};
          field.select.split(' ').forEach(key => {
            selected[key] = found[key];
          });
          populated[field.path] = { _id: found._id, ...selected };
        } else {
          populated[field.path] = found;
        }
      }
    }
  });
  
  return populated;
};