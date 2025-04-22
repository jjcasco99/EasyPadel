const express = require('express');
const router = express.Router();
const { getCourts, getCourtsByClubId } = require('../controllers/courtsController');

router.get('/', getCourts);
router.get('/club/:clubId', getCourtsByClubId);

module.exports = router;
