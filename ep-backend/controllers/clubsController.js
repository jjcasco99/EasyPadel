const pool = require('../db');


const getClubs = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM clubs');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener clubs:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getClubById = async (req, res) => {
    const clubId = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM clubs WHERE id = $1', [clubId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Club no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el club:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getClubs,
    getClubById
}