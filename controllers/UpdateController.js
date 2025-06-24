const { supabaseAnonClient } = require("../supabaseClient");

// 🔄 Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  const { id } = req.params; // ID desde la URL
  const { nombre, descripcion, hora, fecha_entrega, prioridad, completado } = req.body;

  // Validación básica
  if (!id) {
    return res.status(400).json({ error: "ID requerido" });
  }

  const { data, error } = await supabaseAnonClient
    .from("tareas")
    .update({
      nombre,
      descripcion,
      hora,
      fecha_entrega,
      prioridad,
      completado,
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json({ tarea: data[0] });
};
