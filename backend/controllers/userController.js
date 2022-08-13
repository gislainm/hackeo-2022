"use strict";
/*eslint-disable */

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseInfo = require('../models/responseInfo');
let SECRET;

exports.authenticate = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");
    try {
        let permission = jwt.verify(token, SECRET);
        res.status(200).json(new responseInfo(false, null, permission));
    } catch (err) {
        res.status(401).json(new responseInfo(true, "Invalid JWT permission", null));
    }
}


exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    SECRET = "login key for map collab users";
    const user = await User.findOne({ usernmae: username });
    if (user) {
        const validatePwd = await bcrypt.compare(password, user.password);
        if (validatePwd) {
            const accessToken = jwt.sign({
                id: user._id,
                username: user.username,
                iat: Date.now()
            }, SECRET);
            res.status(200).json(new responseInfo(false, null, {
                accessToken: accessToken,
                user: user
            }));
        } else {
            res.status(400).json(new responseInfo(true, 'wrong password', null))
        }
    } else {
        res.status(400).json(new responseInfo(true, 'wrong username', null))
    }
}

exports.signUp = async (req, res, next) => {
    const newuser = new User(req.body);
    try {
        await newuser.save()
        res.status(201).json(new responseInfo(false, null, newuser));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "signing up user failed", null));
    }
}

exports.deleteUser = async (req, res, next) => {

}