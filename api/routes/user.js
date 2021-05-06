const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');


/**
 * SIGNUP route
 */
router.post('/signup', UserController.user_signup);

/**
 * LOGIN route
 */
router.post('/login', UserController.user_login);

/**
 * To delete a USER
 */
router.delete('/:userId', checkAuth, UserController.user_delete);


module.exports = router;