// this file connects the route to the controller functions

const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout,

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

// these next 4 routes must come before the /:userId endpoint
router.route('/forgotPassword')
    .post(forgotPassword)

router.route('/resetPassword')
    .put(resetPassword)

router.route('/updatePassword')
    .put(protectedRoute, updatePassword)

router.route('/logout')
    .get(protectedRoute, logout)

router.route('/:userId')
    .get(protectedRoute, getUser) 
    .put(protectedRoute, updateUser)
    .delete(protectedRoute, deleteUser)

module.exports = router
