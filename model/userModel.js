const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: "user"
    },
}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
