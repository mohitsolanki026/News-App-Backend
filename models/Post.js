const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image: {
        publicId: String,
        url :String
    },
    url: {
        type: String
    },
    headline: {
        type: String,
        // required : true
    },
    subHeadline: {
        type: String,
    },
    caption:{
        type: String,
        // required :true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    dislikes:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ],
    category: {
        type: String,
        // required: true
    },
    
},{
    timestamps :true
})

module.exports = mongoose.model("post",postSchema);