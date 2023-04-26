// this file connects the route to the controller functions

const express = require('express');
const router = express.Router();
const {
    getSongs,
    postSong,
    deleteSongs,

    getSong,
    updateSong,
    deleteSong, 

    getSongRatings,
    postSongRating,
    deleteSongRatings, 
    
    getSongRating,
    updateSongRating,
    deleteSongRating
} = require('../controllers/songController')

router.route('/') 
    .get(getSongs)
    .post(postSong)
    .delete(deleteSongs)

router.route('/:songId')
    .get(getSong)
    .put(updateSong)
    .delete(deleteSong)

router.route('/:songId/ratings')
    .get(getSongRatings)
    .post(postSongRating)
    .delete(deleteSongRatings)

router.route('/:songId/ratings/:ratingId')
    .get(getSongRating)
    .put(updateSongRating)
    .delete(deleteSongRating)

module.exports = router
