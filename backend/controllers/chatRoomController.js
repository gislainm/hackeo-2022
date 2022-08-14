"use strict";
/*eslint-disable */
const User = require("../models/user");
const Chatroom = require("../models/chatRooms");
const Message = require("../models/messages");
const responseInfo = require("../models/responseInfo");
const { ObjectId } = require('mongodb');

exports.createChatroom = async (req, res, next) => {
    const participants = req.body.participants.map(item => new ObjectId(item));
    const newChatroom = new Chatroom({ participants });
    try {
        await newChatroom.save()
        res.status(201).json(new responseInfo(false, null, newChatroom));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "creating new chatroom failed", null));
    }

}

exports.getAllMessages = async (req, res, next) => {
    const chatroomId = req.query.chatroomId;
    try {
        const messages = await Message.find({ chatRoomId: new ObjectId(chatroomId) }).populate('chatRoomId')
        if (messages && messages.length) {
            res.status(200).json(new responseInfo(false, null, messages));
        } else {
            res.status(400).json(new responseInfo(true, "chatroom doesn't exitst in the database", null))
        }
    } catch (error) {
        res.status(500).json(new responseInfo(true, "fetching messages failed", null));
    }

}

exports.createMessage = async (req, res, next) => {
    const newMessage = new Message({
        sender: new ObjectId(req.body.sender),
        message: req.body.message,
        chatRoomId: new ObjectId(req.body.chatRoomId)
    })
    try {
        await newMessage.save();
        res.status(201).json(new responseInfo(false, null, newMessage));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "creating new message failed", null));
    }
}

exports.adduserInChatroom = async (req, res, next) => {
    const userTobeAddedId = req.body.userToAdd;
    const chatRoomId = req.body.chatRoomId;
    try {
        const response = await Chatroom.findByIdAndUpdate(new ObjectId(chatRoomId), { $push: { participants: new ObjectId(userTobeAddedId) } }, { new: true }).populate('participants');
        if (response) {
            res.status(202).json(new responseInfo(false, null, response));
        } else {
            res.status(400).json(new responseInfo(true, "Chatroom doesn't exist", null));
        }
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Adding user to chatroom failed", null));
    }
}