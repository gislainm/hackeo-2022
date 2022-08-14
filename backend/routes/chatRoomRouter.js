"use strict";
/*eslint-disable */
const express = require('express');
const router = express.Router();
const chatRoomController = require("../controllers/chatRoomController");

router.post('/startChatroom', chatRoomController.createChatroom);
router.get('/getAllMessages', chatRoomController.getAllMessages);
router.post('/createMessage', chatRoomController.createMessage);
router.post('/adduserInChatroom', chatRoomController.adduserInChatroom);

module.exports = router;