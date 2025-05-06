const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    message : {
        type: String,
        required: true,
    },

    messageFrom : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },

    messageTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },

    messageType : {
        type: String,
        required: true,
    },
    
    messagedAt : {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messagesSchema);