const express = require('express');
require('dotenv').config(); // tiene que estar antes de usar process.env
const app = express();
const pool = require('./db');
const clubsRouter = require('./routes/clubs');
const courtsRouter = require('./routes/courts');
const usersRouter = require('./routes/users');
const bookingsRoutes = require('./routes/bookings');
const cors = require('cors');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors())
app.use('/clubs', clubsRouter);
app.use('/courts', courtsRouter);
app.use('/users', usersRouter);
app.use("/bookings", bookingsRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`¡Conexión exitosa! Hora del servidor: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    res.status(500).send('Error de conexión');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
