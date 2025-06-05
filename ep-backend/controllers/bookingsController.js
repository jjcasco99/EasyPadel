const pool = require("../db");

const createBooking = async (req, res) => {
  const { user_id, court_id, start_time, end_time, day } = req.body;

  if (!user_id || !court_id || !start_time || !end_time || !day) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // // Comprobamos si la pista ya está reservada en ese horario
    // const courtOverlap = await pool.query(
    //   `SELECT * FROM bookings
    //    WHERE court_id = $1
    //    AND status IN ('pending', 'confirmed')
    //    AND NOT ($3 <= start_time OR $2 >= end_time)`,
    //   [court_id, start_time, end_time]
    // );

    // if (courtOverlap.rows.length > 0) {
    //   return res.status(409).json({ error: "La pista ya está reservada en ese horario" });
    // }

    // // Comprobamos si el usuario ya tiene una reserva en ese horario
    // const userOverlap = await pool.query(
    //   `SELECT * FROM bookings
    //    WHERE user_id = $1
    //    AND status IN ('pending', 'confirmed')
    //    AND NOT ($3 <= start_time OR $2 >= end_time)`,
    //   [user_id, start_time, end_time]
    // );

    // if (userOverlap.rows.length > 0) {
    //   return res.status(409).json({ error: "Ya tienes una reserva en ese horario" });
    // }

    // Insertamos la nueva reserva
    const result = await pool.query(
      `INSERT INTO bookings (user_id, court_id, start_time, end_time, status, day)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, court_id, start_time, end_time, "pending", day]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando reserva:", error);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

const getBookingsByCourt = async (req, res) => {
  const { courtId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM bookings
       JOIN courts c ON bookings.court_id = c.id
       WHERE bookings.court_id = $1`,
      [courtId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reservas por pista:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getBookingsByClub = async (req, res) => {
  const { clubId } = req.params;
  try {
    const result = await pool.query(
      `SELECT b.*, c.name AS court_name, cl.name AS club_name
       FROM bookings b
       JOIN courts c ON b.court_id = c.id
       JOIN clubs cl ON c.club_id = cl.id
       WHERE cl.id = $1
       ORDER BY b.start_time DESC`,
      [clubId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reservas del club:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT b.*, c.name AS court_name, cl.name AS club_name
       FROM bookings b
       JOIN courts c ON b.court_id = c.id
       JOIN clubs cl ON c.club_id = cl.id
       WHERE b.user_id = $1
       ORDER BY b.start_time DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reservas del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;


  try {
    const result = await pool.query(
      `DELETE FROM bookings
       WHERE court_id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al cancelar la reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createBooking,
  getBookingsByCourt,
  getBookingsByUser,
  getBookingsByClub,
  cancelBooking
};