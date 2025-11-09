const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/moviesController');

router.get('/', ctrl.nowPlaying);
router.get('/:id', ctrl.movieDetail);

module.exports = router;
