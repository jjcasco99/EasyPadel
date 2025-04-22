const pool = require('../db');


const getCourts = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM courts');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener courts:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

const getCourtsByClubId = async (req, res) => {
    const { clubId } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM courts WHERE club_id = $1',
        [clubId]
      );
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener pistas del club:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = {
    getCourts,
    getCourtsByClubId,
  };
  