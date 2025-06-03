# U-Connect API 📚

API para comunidades universitarias cercanas a la EPN (Escuela Politécnica Nacional). Facilita la conexión entre estudiantes, gestión de comunidades, comentarios y mensajería en tiempo real.

## Tecnologías Utilizadas 🛠️

- **Express.js**: Framework para construir la API REST.
- **JWT (JSON Web Tokens)**: Autenticación y autorización de usuarios.
- **Nodemailer**: Envío de correos electrónicos (confirmación, recuperación de contraseña).
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Socket.IO**: Chat en tiempo real entre usuarios.
- **Cloudinary**: Almacenamiento y gestión de imágenes de perfil.

## Instalación 🚀

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/SolarSpectre/api-restful.git
   cd u-connect-api.

Estructura del proyecto

![image](https://github.com/user-attachments/assets/778ebd53-32d0-431e-ab22-ecbf38ce4786)

2. **Instalar dependencias**:
```bash
    npm install
```
3. **Configurar variables de entorno**:
Crea un archivo .env en la raíz del proyecto con las siguientes variables:
```env
    MONGODB_URI=tu_url_de_mongodb
    CLOUDINARY_CLOUD_NAME=tu_cloud_name
    CLOUDINARY_API_KEY=tu_api_key
    CLOUDINARY_API_SECRET=tu_api_secret
    JWT_SECRET=tu_secreto_jwt
    URL_FRONTEND=http://localhost:3000  # URL del frontend
    # Configuración de Mailtrap (pruebas de correo)
    HOST_MAILTRAP=smtp.mailtrap.io
    PORT_MAILTRAP=2525
    USER_MAILTRAP=tu_usuario_mailtrap
    PASS_MAILTRAP=tu_contraseña_mailtrap
```
4. **Ejecutar el servidor**:
```bash
    npm start
```
Modo desarrollo (con Nodemon):
```bash
    npm run dev
```
## Rutas de la API 🔌
## Administrador 👨💼
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | /api/registro | Registro de administrador. |
| POST   | /api/login | Inicio de sesión. |
| GET    | /api/admin/perfil | Obtener perfil del administrador. |
| PUT    | /api/administrador/:id | Actualizar perfil. |
| PUT    | /api/administrador/actualizarpassword | Actualizar contraseña. |
| POST   | /api/recuperar-password | Recuperar contraseña (envía correo). |
| GET    | /api/confirmar/:token | Confirmar email (vía token). |

## Estudiante 🎓
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | /api/student/register | Registro de estudiante. |
| POST   | /api/student/login | Inicio de sesión. |
| GET    | /api/student/profile | Obtener perfil del estudiante. |
| GET    | /api/student/all | Listar todos los estudiantes. |
| GET    | /api/student/:id | Obtener estudiante por ID. |
| PUT    | /api/student/update | Actualizar perfil. |
| DELETE | /api/student/delete | Eliminar cuenta. |
| POST   | /api/student/add-friend/:id | Agregar amigo. |
| DELETE | /api/student/remove-friend/:id | Eliminar amigo. |

## Comunidades 🏛️
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | /api/comunidades/ | Crear comunidad. |
| GET    | /api/comunidades | Obtener todas las comunidades. |
| GET    | /api/comunidades/:id | Obtener comunidad por ID. |
| PUT    | /api/comunidades/:id | Actualizar comunidad. |
| DELETE | /api/comunidades/:id | Eliminar comunidad. |
| POST   | /api/comunidades/:id/unirse | Unirse a una comunidad. |

## Comentarios 💬
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | /api/comentarios/ | Crear comentario. |
| GET    | /api/comentarios/:comunidadId | Obtener comentario por ID. |
| PATCH  | /api/comentarios/:id_comentario | Actualizar comentario. |
| DELETE | /api/comentarios/:id_comentario | Eliminar comentario. |

## Mensajes 📩
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/mensaje/usuarios | Listar usuarios conectados. |
| GET    | /api/mensaje/:id | Obtener historial de mensajes. |
| POST   | /api/mensaje/enviar/:id | Enviar mensajes. |
| WebSocket | /socket.io/ | Enviar mensajes en tiempo real. |

### Despliegue en Render 🚀

La API está desplegada en Render.
URL de producción: https://api-restful-iul9.onrender.com
**Pasos para despliegue**:

- Conectar repositorio de GitHub a Render.
- Configurar variables de entorno en el dashboard de Render.
- Especificar el comando de inicio: npm start.
- ¡Desplegar!



## Contribuidores ✨

Marlon Nicolalde, Joseph Caza, Michelle Suárez e Isaac Quinapallo
