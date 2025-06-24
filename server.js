const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); 
app.use(cors());
app.use(express.json());

//Registro de Rutas
app.use('/api/auth', require("./routes/authRoutes"));
app.use('/api/tareas', require ("./routes/tareasRoutes"));
//app.use('/api/books', require("./routes/bookRoutes"));



const PORT = process.env.PORT || 3001;
app.listen(
    PORT, 
    ()=>console.log(`Servidor corriendo en puerto ${PORT}`));