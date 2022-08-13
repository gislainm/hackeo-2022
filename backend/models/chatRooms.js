"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatRoomSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
}, { timestamps: true })