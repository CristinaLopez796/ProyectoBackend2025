const { createClient } = require('@supabase/supabase-js');
// Importa la librería de cliente de Supabase para interactuar con la base de datos
// La librería supabase-js permite interactuar con la base de datos de Supabase desde el backend de Node.js
const supabaseAdmin = require('../supabaseClient'); // Importa el cliente de Supabase configurado en supabaseClient.js

require('dotenv').config();

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY// esta variable SUPABASE_SERVICE_ROLE_KEY sirve para autenticar al usuario anonimo
);
//Funcion de actualizar tareas
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
//Funcion de crear tareas
exports.createTask = async (req, res) => {
  console.log('se recibio una nueva tarea')
    const { nombre, descripcion, hora, fecha_entrega, prioridad, completado } = req.body;

    const { data, error } = await supabaseAnonClient.from("tareas").insert([
        { nombre, descripcion, hora, fecha_entrega, prioridad, completado }]
    );

    if (error) return res.status(500).json({
        error: error.message
    });
    res.status(201).json(data);
    return res;
}

//Funcion de obtener tarea
exports.getAllTask = async (req, res) => {
    const { data, error } = await supabaseAnonClient.from("tareas").select("*");
    if (error) return res.status(500).json({
        error: error.message
    });
    res.json({ data });
    return res;
  }

    exports.eliminarTarea = async (req, res) => {
  const { id } = req.params;

  // Validación básica
  if (!id) {
    return res.status(400).json({ error: "ID de tarea requerido" });
  }

  //Funcion de eliminar la tarea
  const { error } = await supabaseAnonClient
    .from("tareas")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Tarea eliminada correctamente" });
};

