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

const protectedRoute = require('../middlewares/auth')

router.route('/') 
    .get(getArtists)
    .post(protectedRoute, postArtist)
    .delete(protectedRoute, deleteArtists)

router.route('/:artistId')
    .get(getArtist)
    .put(protectedRoute, updateArtist)
    .delete(protectedRoute, deleteArtist)

router.route('/:artistId/image')
    .post(protectedRoute, postArtistImage)

module.exports = router
