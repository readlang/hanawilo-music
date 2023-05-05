const express = require('express');
const router = express.Router();

const {
    getTest
} = require('../controllers/testController')

router.route('/')
    .get(getTest)

module.exports = router
