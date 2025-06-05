const express = require('express');
const router = express.Router();
const { getClubs, getClubById, removeClub, createClub } = require('../controllers/clubsController');

router.get('/', getClubs);
router.get('/:id', getClubById);
router.delete('/:id', removeClub);
router.post('/add-club', createClub)

module.exports = router;
