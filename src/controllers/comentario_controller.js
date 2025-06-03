import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Comentario from "../models/Comentario.js";
import Publicacion from "../models/Publicaciones.js";
import Comunidad from "../models/Comunidad.js";

// Crear un nuevo comentario
export const crearComentario = async (req, res) => {
  try {
    // Extraemos los datos necesarios del cuerpo de la petición
    const { publicacion, contenido, comunidad } = req.body;

    // Extraemos y verificamos el token JWT para obtener el id del usuario
    const token = req.headers.authorization?.split(' ')[1];
    const { idToken } = jwt.verify(token, process.env.JWT_SECRET);

    // Validamos que todos los datos obligatorios estén presentes
    if (!publicacion || !contenido || !comunidad) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Validamos que los IDs sean válidos en formato ObjectId de MongoDB
    if (!mongoose.Types.ObjectId.isValid(publicacion) || !mongoose.Types.ObjectId.isValid(comunidad)) {
      return res.status(400).json({ error: "IDs inválidos" });
    }

    // Verificamos que la publicación exista en la base de datos
    const publicacionEncontrada = await Publicacion.findById(publicacion);
    if (!publicacionEncontrada) {
      return res.status(404).json({ error: "La publicación no existe" });
    }

    // Comprobamos que la publicación pertenece a la comunidad indicada
    if (publicacionEncontrada.comunidad.toString() !== comunidad) {
      return res.status(400).json({ error: "El comentario debe pertenecer a la misma comunidad que la publicación" });
    }

    // Verificamos que la comunidad exista y que el usuario sea miembro de dicha comunidad
    const comunidadEncontrada = await Comunidad.findById(comunidad);
    if (!comunidadEncontrada || !comunidadEncontrada.estudiantes.includes(idToken)) {
      return res.status(403).json({ error: "El usuario no pertenece a esta comunidad" });
    }

    // Creamos un nuevo documento de comentario con los datos validados
    const nuevoComentario = new Comentario({
      publicacion,
      comunidad,
      usuario: idToken,
      contenido
    });

    // Guardamos el comentario en la base de datos
    await nuevoComentario.save();

    // Buscamos el comentario guardado y poblamos el campo usuario con datos seleccionados
    const populated = await Comentario.findById(nuevoComentario._id)
      .populate("usuario", "_id usuario fotoPerfil");

    // Respondemos con el comentario creado y poblado
    res.status(201).json(populated);

  } catch (error) {
    console.error(error);
    // En caso de error, respondemos con un estado 500 y mensaje de error
    res.status(500).json({ error: "Error al crear el comentario" });
  }
};

// Eliminar un comentario por su ID
export const eliminarComentario = async (req, res) => {
  try {
    // Extraemos el ID del comentario desde los parámetros de la ruta
    const { id } = req.params;

    // Buscamos y eliminamos el comentario de la base de datos
    const eliminado = await Comentario.findByIdAndDelete(id);

    // Si no se encontró el comentario, respondemos con error 404
    if (!eliminado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    // Confirmamos que el comentario fue eliminado exitosamente
    res.status(200).json({ mensaje: "Comentario eliminado correctamente" });

  } catch (error) {
    // En caso de error, respondemos con estado 500 y mensaje de error
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

// Obtener todos los comentarios asociados a una publicación específica
export const obtenerComentariosPorPublicacion = async (req, res) => {
  try {
    // Obtenemos el ID de la publicación desde los parámetros de la ruta
    const { publicacionId } = req.params;

    // Buscamos todos los comentarios que pertenezcan a la publicación indicada
    const comentarios = await Comentario.find({ publicacion: publicacionId })
      .sort({ fecha_creacion: 1 }) // Ordenamos por fecha de creación ascendente
      .populate("usuario", "_id usuario fotoPerfil"); // Poblar datos básicos del usuario que comenta

    // Enviamos la lista de comentarios encontrados
    res.status(200).json(comentarios);

  } catch (error) {
    // En caso de error, respondemos con estado 500 y mensaje de error
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
};
