// this file connects the route to the controller functions

const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    
    login,

    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')
const adminValidator = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth')

router.route('/') 
    .get(protectedRoute, adminValidator, getUsers) // this route checks if admin
    .post(protectedRoute, postUser)
    .delete(protectedRoute, deleteUsers)

// make sure this is NOT a protected route, since it is the login
router.route('/login')
    .post(login)

router.route('/:userId')
    .get(protectedRoute, getUser) 
    .put(protectedRoute, updateUser)
    .delete(protectedRoute, deleteUser)

module.exports = router
