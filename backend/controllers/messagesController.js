const messagesSchema = require('../model/messagesSchema');
const mongoose = require('mongoose');

exports.create_send_Message = async(req,resp) => {
    try{
        const { message, messageFrom, messageTo, messageType } = req.body;

        if(!message || !messageFrom || !messageTo || !messageType){
            return resp.status(400).json({
                success : false,
                message : "All Fileds are Required"
            })
        }

        const newMessage = await messagesSchema.create ({ message, messageFrom, messageTo, messageType, messagedAt : Date.now() });
        resp.status(200).json({
            success : true,
            message : "Message Created Succesfully",
            Message : newMessage,
        });

    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getMessages = async(req,resp) => {
    try{
        const { messageFrom, messageTo } = req.params;

        const messages = await messagesSchema.find({
            $or : [
                { messageFrom, messageTo },
                { messageFrom : messageTo, messageTo : messageFrom }
            ]
        }).sort({messagedAt : 1});
        resp.status(200).json({
            success : true,
            message : "Fetched Messages Successfully",
            Messages : messages,
        })
    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getAllMessages = async(req,resp) => {
    try{

        const allMessages = await messagesSchema.find({}).sort({messagedAt : 1});
        resp.status(200).json({
            success : true,
            message : "Fetched All Messages Successfully",
            Messages : allMessages,
        })
    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}