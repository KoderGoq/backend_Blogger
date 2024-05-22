const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectar a la base de datos
const db = new sqlite3.Database('./database.db');

// Obtener todos los comentarios de una publicación
router.get('/:postId/comentarios', (req, res) => {
  const postId = parseInt(req.params.postId);
  db.all('SELECT * FROM Comments WHERE post_id = ?', [postId], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Agregar un nuevo comentario a una publicación
router.post('/:postId/comentarios', (req, res) => {
  const postId = parseInt(req.params.postId);
  const { name, comment } = req.body;
  db.run('INSERT INTO Comments (post_id, name, comment) VALUES (?, ?, ?)', [postId, name, comment], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

// Eliminar todos los comentarios de una publicación
router.delete('/:postId/comentarios', (req, res) => {
  const postId = parseInt(req.params.postId);
  db.run('DELETE FROM Comments WHERE post_id = ?', [postId], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Todos los comentarios de la publicación han sido eliminados exitosamente');
    }
  });
});

// Eliminar un comentario específico de una publicación
router.delete('/:postId/comentarios/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  db.run('DELETE FROM Comments WHERE post_id = ? AND id = ?', [postId, commentId], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Comentario no encontrado');
    } else {
      res.send('Comentario eliminado exitosamente');
    }
  });
});

module.exports = router;
