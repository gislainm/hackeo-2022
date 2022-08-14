"use strict";
/*eslint-disable */

const User = require('../models/user');
const UserLocation = require('../models/userLocation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseInfo = require('../models/responseInfo');
const { ObjectId } = require('mongodb');
let SECRET;

exports.authenticate = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");
    try {
        let permission = jwt.verify(token, SECRET);
        res.status(200).json(new responseInfo(false, null, permission));
    } catch (err) {
        console.log(error)
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
        console.log(error)
        res.status(500).json(new responseInfo(true, "signing up user failed", null));
    }
}

exports.deleteUser = async (req, res, next) => {
    SECRET = "login key for map collab users";
    const [, token] = req.headers.authorization.split(" ");
    let permission = jwt.verify(token, SECRET);
    if (permission) {
        try {
            const deleteduser = await User.findOneAndDelete({ username: permission.username });
            res.status(200).json(new responseInfo(false, null, deleteduser));
        } catch (error) {
            console.log(error)
            res.status(500).json(new responseInfo(true, "deleting account failed", null))
        }
    } else {
        res.status(401).json(new responseInfo(true, "user unauthorized", null));
    }

}

exports.saveUserCurrentLocation = async (req, res, next) => {
    SECRET = "login key for map collab users";
    const token = req.body.accessToken;
    const coords = req.body.coordinates;
    let permission = jwt.verify(token, SECRET);
    if (permission) {
        try {
            const userCurrLocation = new UserLocation({
                user: new ObjectId(permission.id),
                location: {
                    type: 'Point',
                    coordinates: coords
                }
            })
            await userCurrLocation.save();
            res.status(201).json(userCurrLocation);
        } catch (error) {
            console.log(error)
            res.status(500).json(new responseInfo(true, "saving user's current location failed", null));
        }
    } else {
        res.status(401).json(new responseInfo(true, "user unauthorized", null));
    }
}

exports.getAllUsersLoc = async (req, res, next) => {
    SECRET = "login key for map collab users";
    const [, token] = req.headers.authorization.split(" ");
    let permission = jwt.verify(token, SECRET);
    if (permission) {
        console.log("permission is true")
        const allUsersloc = await UserLocation.find({}).populate('user');
        res.status(200).json(new responseInfo(false, null, allUsersloc));
    } else {
        res.status(401).json(new responseInfo(true, "user unauthorized", null));
    }
}