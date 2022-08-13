"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    chatRoomId: { type: Schema.Types.ObjectId, ref: 'Chatroom', required: true }
}, { timestamps: true })

const Model = mongoose.model('Message', messageSchema)
module.exports = Model;