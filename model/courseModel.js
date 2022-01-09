const mongoose = require('mongoose');

const Course = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fee: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    }
},{
    collection: "course",
    timestamps: true
});

module.exports = mongoose.model("Course", Course);