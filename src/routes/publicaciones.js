const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectar a la base de datos
const db = new sqlite3.Database('./database.db');

// Obtener todas las publicaciones
router.get('/', (req, res) => {
  db.all('SELECT * FROM Posts', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Obtener una publicación por su ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('SELECT * FROM Posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send('Publicación no encontrada');
    } else {
      res.json(row);
    }
  });
});

// Agregar una nueva publicación
router.post('/', (req, res) => {
  const { user_id, title, content } = req.body;

  // Primero, verificamos si el user_id existe
  db.get('SELECT id FROM Users WHERE id = ?', [user_id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      // Si el usuario no existe, enviamos un error
      res.status(400).send({ error: 'User ID does not exist' });
    } else {
      // Si el usuario existe, insertamos la nueva publicación
      db.run('INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)', [user_id, title, content], function (err) {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(201).send({ id: this.lastID });
        }
      });
    }
  });
});


// Actualizar una publicación existente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, title, content } = req.body;
  db.run('UPDATE Posts SET user_id = ?, title = ?, content = ? WHERE id = ?', [user_id, title, content, id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Publicación no encontrada');
    } else {
      res.send('Publicación actualizada exitosamente');
    }
  });
});

// Eliminar una publicación
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.run('DELETE FROM Posts WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Publicación no encontrada');
    } else {
      res.send('Publicación eliminada exitosamente');
    }
  });
});

module.exports = router;
