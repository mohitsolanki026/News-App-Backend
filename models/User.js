const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require :true,
        select: false
    },
    preference:[
        {
            type: String
        }
    ],
    admin:{
        type: Boolean,
        default:false,
        require: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("users",userSchema)