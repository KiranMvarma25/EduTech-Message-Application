const usersSchema = require('../model/usersSchema');
const bcrypt = require('bcrypt');

exports.createUsers = async (req,resp) => {
    try{
        const { name, password, email, mobile } = req.body;

        if(!name || !password || !email || !mobile){
            return resp.status(400).json({
                success : false,
                message : "Please Fill All the Details"
            })
        }

        const isPresent = await usersSchema.findOne({email});
        if(isPresent){
            return resp.status(400).json({
                success : false,
                message : "Account already Exists, Please SignIn"
            })
        }

        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return resp.status(400).json({
                success : false,
                message : "Error in Hashing the Password"
            })
        }

        const createdUser = await usersSchema.create({ name, password : hashPassword, email, mobile, img : `https://api.dicebear.com/5.x/initials/svg?seed=${name}` });
        
        return resp.status(200).json({
            success : true,
            message : "User Created Successfully",
            User : createdUser,
        });

    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getUsers = async(req,resp) => {
    try{
        const getusers = await usersSchema.find({});
        return resp.status(200).json({
            success : true,
            message : "User Fetched Successfully",
            User : getusers,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getUsersById = async(req,resp) => {
    try{
        const { id } = req.params;

        try{
            const getuserbyid = await usersSchema.findById({_id : id})

            return resp.status(200).json({
                success : true,
                message : "User Fetched By Id Successfully",
                User : getuserbyid,
            });
        }

        catch(error){
            resp.status(500).json({
                success : false,
                message : `User with Id : ${id} Not Found`
            })
        }

    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.updateUsers = async(req,resp) => {
    try{
        const { id } = req.params;
        const { name, password, email, mobile } = req.body;

        const updatedUsers = await usersSchema.findByIdAndUpdate({_id : id}, {name, password, email, mobile});
        
        return resp.status(200).json({
            success : true,
            message : "Updated User Successfully",
            User : updatedUsers,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.deleteUsers = async(req,resp) => {
    try{
        const { id } = req.params;

        const deleteusers = await usersSchema.findByIdAndDelete({_id : id});
        
        return resp.status(200).json({
            success : true,
            message : "Deleted User Successfully",
            User : deleteusers,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}