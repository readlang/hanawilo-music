const express = require('express');
const router = express.Router();
const {
    getArtists,
    postArtist,
    deleteArtists
} = require('../controllers/artistController')

router.route('/') 
    .get(getArtists)
    .post(postArtist)
    .delete(deleteArtists)

module.exports = router
