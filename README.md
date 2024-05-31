# Plataforma Blogger

Esta es una plataforma de blog construida con Node.js, Express y SQLite. Permite a los usuarios crear publicaciones y añadir comentarios. Los datos se almacenan de manera persistente en una base de datos SQLite.

## Contenido

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
  - [Usuarios](#usuarios)
  - [Publicaciones](#publicaciones)
  - [Comentarios](#comentarios)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Crear, leer, actualizar y eliminar usuarios.
- Crear, leer, actualizar y eliminar publicaciones.
- Añadir comentarios a las publicaciones.
- Almacenamiento persistente de datos utilizando SQLite.

## Requisitos

- [Node.js](https://nodejs.org/) v14 o superior.
- [npm](https://www.npmjs.com/) v6 o superior.

## Instalación

1. Clona este repositorio:
   ```sh
   git clone https://github.com/KoderGoq/backend_Blogger.git
   
2. Navega al directorio del proyecto:
    ```sh 
    cd 'tu-ruta'
    cd backend_Blogger
    
    Ej. cd Desktop/
        cd backend_Blogger
   
3. Instala las dependencias:
    ```sh
    npm i or npm intall
    
4. Ejecuta el codigo en tu terminal
    ```sh
    npm run dev

## Endpoints

### Usuarios
- `GET` /usuarios: Obtener todos los usuarios.
- `GET` /usuarios/:id: Obtener un usuario por su ID.
- `POST` /usuarios: Crear un nuevo usuario.
    - Cuerpo de la solicitud: { "name": "Nombre", "email": "correo@ejemplo.com" }
- `PUT` /usuarios/:id: Actualizar un usuario existente.
    - Cuerpo de la solicitud: { "name": "Nombre", "email": "correo@ejemplo.com" }
- `DELETE` /usuarios/:id: Eliminar un usuario.
- `DELETE` /usuarios: Eliminar todos los usuarios.

### Publicaciones
- `GET` /publicaciones: Obtener todas las publicaciones.
- `GET` /publicaciones/:id: Obtener una publicación por su ID.
- `POST` /publicaciones: Crear una nueva publicación.
    - Cuerpo de la solicitud: { "user_id": 1, "title": "Título", "content": "Contenido" }
- `PUT` /publicaciones/:id: Actualizar una publicación existente.
    - Cuerpo de la solicitud: { "user_id": 1, "title": "Título", "content": "Contenido" }
- `DELETE` /publicaciones/:id: Eliminar una publicación.
- `DELETE` /publicaciones: Eliminar todas las publicaciones.

### Comentarios
- `GET` /comentarios: Obtener todos los comentarios.
- `GET` /comentarios/:id: Obtener un comentario por su ID.
- `POST` /comentarios: Crear un nuevo comentario.
    - Cuerpo de la solicitud: { "post_id": 1, "name": "Nombre", "comment": "Comentario" }
- `PUT` /comentarios/:id: Actualizar un comentario existente.
    - Cuerpo de la solicitud: { "post_id": 1, "name": "Nombre", "comment": "Comentario" }
- `DELETE` /comentarios/:id: Eliminar un comentario.
- `DELETE` /comentarios: Eliminar todos los comentarios.

## Estructura de la Base de Datos
### Usuarios (Users)
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL UNIQUE

### Publicaciones (Posts)
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `user_id` INTEGER NOT NULL
- `title` TEXT NOT NULL
- `content` TEXT NOT NULL
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `FOREIGN KEY` (user_id) REFERENCES Users (id)

### Comentarios (Comments)
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `post_id` INTEGER NOT NULL
- `name` TEXT NOT NULL
- `comment` TEXT NOT NULL
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `FOREIGN KEY` (post_id) REFERENCES Posts (id)

### Contribuciones
Las contribuciones son bienvenidas. Para contribuir, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
3. Realiza los cambios necesarios y haz commit (git commit -m 'Agregar nueva característica').
4. Empuja los cambios a tu fork (git push origin feature/nueva-caracteristica).
5. Abre un pull request.


```sh
Este `README.md` proporciona una descripción completa de tu proyecto, facilitando la comprensión y el uso del mismo por parte de otros desarrolladores. Puedes ajustarlo según sea necesario para reflejar con precisión tu proyecto y sus funcionalidades.
