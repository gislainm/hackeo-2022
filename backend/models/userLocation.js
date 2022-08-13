"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userLocationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    currentDate: { type: Date, default: Date.now }

});
userLocationSchema.index({ location: '2dsphere' });

const LocationModel = mongoose.model('Location', userLocationSchema);
module.exports = LocationModel;
