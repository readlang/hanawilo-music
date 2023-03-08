const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers
} = require('../controllers/userController')

router.route('/') 
    .get(getUsers)
    .post(postUser)
    .delete(deleteUsers)

module.exports = router
