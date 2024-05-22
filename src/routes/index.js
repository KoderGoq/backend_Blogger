const dotenv = require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const comentarios = require('./comentarios');
const publicaciones = require('./publicaciones')

const port = process.env.PORT || 4000;

app.use(express.json());

// Conectar a la base de datos
const db = new sqlite3.Database('./database.db');

// Montar las rutas de publicaciones
app.use('/publicaciones', publicaciones);

// Montar las rutas de comentarios
app.use('/comentarios', comentarios);

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM Users', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('SELECT * FROM Users WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.json(row);
    }
  });
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

// Actualizar un usuario existente
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  db.run('UPDATE Users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.send('Usuario actualizado exitosamente');
    }
  });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.run('DELETE FROM Users WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.send('Usuario eliminado exitosamente');
    }
  });
});

// Eliminar todos los usuarios
app.delete('/usuarios', (req, res) => {
  db.run('DELETE FROM Users', function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Todos los usuarios han sido eliminados exitosamente');
    }
  });
});

app.listen(port, () => {
  console.log(`Conectado al puerto ${port}`);
});

