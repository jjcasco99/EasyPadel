const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  
      const user = result.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );
  
      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

module.exports = {
  registerUser,
  loginUser
};
