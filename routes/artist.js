// this file connects the route to the controller functions

const express = require('express');
const router = express.Router();
const {
    getArtists,
    postArtist,
    deleteArtists,
    
    getArtist,
    updateArtist,
    deleteArtist, 

    postArtistImage

} = require('../controllers/artistController')

router.route('/') 
    .get(getArtists)
    .post(postArtist)
    .delete(deleteArtists)

router.route('/:artistId')
    .get(getArtist)
    .put(updateArtist)
    .delete(deleteArtist)

router.route('/:artistId/image')
    .post(postArtistImage)

module.exports = router
