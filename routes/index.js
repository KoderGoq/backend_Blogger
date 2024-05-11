const dotenv = require('dotenv').config(); // Configuramos para leer las variables de entorno
const express = require('express'); // importamos EXPRESS para iniciar nuestro backend
const app = express()

const port = process.env.PORT || 4000 // Definimos el puerto que usaremos

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hola mundo express'); // Prueba del hola mundo
})


let usuarios = [
  { id: 0, name: 'Fernando Aguilar', email: 'laguilar9@ucol.mx' },
  { id: 1, name: 'Jecsan Cardenas', email: 'jcardenas@ucol.mx' },
  { id: 2, name: 'Kode Dev', email: 'test@test.com' }
];

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(user => user.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { name, email } = req.body;
  const id = usuarios.length;
  const users = { id, name, email }
  usuarios.push(users);
  res.status(201).send('Usuario creado exitosamente');
});

// Actualizar un usuario existente
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(user => user.id === id);
  if (index !== -1) {
    usuarios[index] = req.body;
    res.send('Usuario actualizado exitosamente');
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(user => user.id === id);
  if (index !== -1) {
    usuarios.splice(index, 1);
    res.send('Usuario eliminado exitosamente');
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

// Eliminar todos los usuarios
app.delete('/usuarios', (req, res) => {
  // Limpiamos el array de usuarios
  usuarios = [];
  res.send('Todos los usuarios han sido eliminados exitosamente');
});


app.listen(port, () => {
  console.log(`Conectado al puerto.. ${port}`) // test para ver en que puerto estamos conectados
})