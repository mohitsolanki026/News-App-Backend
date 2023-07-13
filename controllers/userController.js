const User = require("../models/User")
const {success, error} = require("../utils/responseWrapper")

const allUsersController = async(req,res)=>{
    try {
        const users = await User.find();
        return res.send(success(200,{users}));       
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id,"id");
        await User.deleteOne({_id:id});
        return res.send(success(200,"success"))
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const updateUser = async(req,res)=>{
    try {
        const {id,name,email} = req.body;
        const user = await User.findById(id).exec();
        console.log(user);

        if (!user) {
          return res.send(error(404, "User not found"));
        }
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        await user.save();

        return res.send(success(200,{user}));

    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const makeAdmin = async(req,res) => {
    try {
        const {id} = req.params;
         const user = await User.findById(id);
        user.admin = !user.admin;

        await user.save();
        return res.send(success(200,"updated"))
    } catch (e) {
        return res.send(success(500,e.message));
    }
}

module.exports = {
    allUsersController,
    updateUser,
    deleteUser,
    makeAdmin,
}