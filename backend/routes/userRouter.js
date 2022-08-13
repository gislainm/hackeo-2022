"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.get('/authenticate', userController.authenticate);
router.delete('/delete', userController.deleteUser);

module.exports = router;