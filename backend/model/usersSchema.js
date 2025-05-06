const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: function () {
            return !this.googleId;  
        },
    },
    img: {
        type: String,
        required: function () {
            return !this.googleId;  
        },
    },
    googleId: {
        type: String,  
    },
    profilePic: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", usersSchema);