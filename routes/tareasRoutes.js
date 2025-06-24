const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// Crear tarea
router.post("/NewTask", tasksController.createTask);

// Obtener todas las tareas
router.get("/ViewTask", tasksController.getAllTask);

// Actualizar tarea por ID
router.put("/Updatetask/:id", tasksController.actualizarTarea);

// Eliminar tarea por ID
router.delete("/DeleteTask/:id", tasksController.eliminarTarea);

module.exports = router;
