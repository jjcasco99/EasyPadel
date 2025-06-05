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

const removeClub = async (req, res) => {
    const clubId = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM clubs WHERE id = $1 RETURNING *', [clubId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Club no encontrado' });
        }
        res.json({ message: 'Club eliminado correctamente', club: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar el club:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createClub = async (req, res) => {
    const { name, description, city, address, background, open_time, close_time } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clubs (name, description, city, address, background, open_time, close_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, description, city, address, background, open_time, close_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el club:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getClubs,
    getClubById,
    removeClub,
    createClub
}