"use strict";
/*eslint-disable */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const chatRoomRouter = require("./routes/chatRoomRouter");
const responseInfo = require('./models/responseInfo');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/mapCollab', userRouter);
app.use('/mapCollab', chatRoomRouter)

app.use((req, res, next) => {
    res.status(404).json(new responseInfo(true, "Page Not Found", null));
})

app.use((err, req, res, next) => {
    res.status(500).json(new responseInfo(true, err.message, null));
});

mongoose.connect('mongodb://localhost:27017/CollabDB')
    .then(() => {
        app.listen(8080, () => { console.log('welcome on map collab') })
    })