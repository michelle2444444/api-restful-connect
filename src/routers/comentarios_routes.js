import { Router } from "express";
const router = Router();

import {
  crearComentario,
  eliminarComentario,
  obtenerComentariosPorPublicacion
} from "../controllers/comentario_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";

// Crear comentario
router.post("/comentario", verificarAutenticacion, crearComentario);

// Eliminar comentario
router.delete("/comentario/:id", verificarAutenticacion, eliminarComentario);

// Obtener comentarios de una publicación
router.get("/publicacion/:publicacionId", verificarAutenticacion, obtenerComentariosPorPublicacion);

export default router;
