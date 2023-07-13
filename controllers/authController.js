const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { error, success } = require("../utils/responseWrapper")


const signupController = async(req,res) =>{
    try{
        const { name, email, password } = req.body;
        console.log(req.body)
        if(!email || !password || !name){
            return res.send(error(400,"All fields are required"));
        }

        const oldUser = await User.findOne({ email });
        if(oldUser){
            res.send(error(409,"User is already registered"));
        }

        const hashedPassword = await bcrypt.hash(password ,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            admin:false
        });

        const accessToken = generateAccessToken({
            _id: user._id,
        });        
        return res.send(
            success(201,accessToken)
        );
    } catch(e){
        return res.send(error(500,e.message))
    }
}

const loginController = async(req,res)=>{
    try{
        const {email, password} = req.body;
        
        if(!email || !password ){
            return res.send(error(400,"All fields are required"));
        }

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.send(error(404,"User is not registered"));
        }

        const matched = await bcrypt.compare(password,user.password);
        if(!matched){
            return res.send(error(403,"incorrect password"));
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });
        const refreshToken = generateRefreshToken({
            _id : user._id,
        })
        res.cookie("jwt",refreshToken,{httpOnly: true,
        secure: true,
        });
        return res.send(success(200,{accessToken}));
    }catch(e){
        return res.send(error(500,e.message));
    }
}

const generateAccessToken = (data) =>{
    try{
        const token =jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{ expiresIn:"1d"});
        return token;
    }catch (e){
        console.log(e.message);
    }
};

const generateRefreshToken = (data) => {
    try{
        const token = jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{expiresIn:"1y"});
        return token;
    }catch (error){
        console.log(error);
    }
};
module.exports ={
    signupController,
    loginController,
}