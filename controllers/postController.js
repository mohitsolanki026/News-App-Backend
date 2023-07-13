const Post = require("../models/Post");
const User = require("../models/User");
const {error, success} = require("../utils/responseWrapper")
const cloudinary = require('cloudinary').v2;

const allPostController = async(req,res) =>{
    try{
        const allposts = await Post.find();
        // param
        return res.send(success(200, allposts));
    }catch (e){
        console.log(error);
        return res.send(error(500,e.message));
    }
}

const likeController = async (req,res) =>{
    try{
        const {id} = req.body;
        const curUserId = req._id;
        const post = await Post.findById(id)
        if(!post){
            return res.send(error(404,"Post not found"));
        }

        if(post.likes.includes(curUserId)){
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index,1);
        } else{
            if(post.dislikes.includes(curUserId)){
                const index = post.dislikes.indexOf(curUserId);
                post.dislikes.splice(index,1);
            }
            post.likes.push(curUserId);
        }
        await post.save();
        return res.send(success(200, {post}));
    }catch(e){
        return res.send(error(500,e.message));
    }
}
const dislikesController = async(req,res) => {
    try {
        const {id} = req.body;
        const curUserId = req._id;
        const post = await Post.findById(id)
        if(!post){
            return res.send(error(400,"post not found"));
        }

        if(post.dislikes.includes(curUserId)){
            const index = post.dislikes.indexOf(curUserId);
            post.dislikes.splice(index,1);
        }else{
            if(post.likes.includes(curUserId)){
                const index=post.likes.indexOf(curUserId);
                post.likes.splice(index,1);
            }
            post.dislikes.push(curUserId);
        }
        await post.save();
        return res.send(success(200,{post}));
        }
     catch (e) {
        return res.send(error(500,e.message));
    }
}

const createPostController = async(req,res)=>{
    try{
        const { headline, subHeadline, postImg, caption} = req.body;
        if(!headline || !postImg || !caption){
            return res.send(error(400,"all field are required"))
        }
    
        const image = await cloudinary.uploader.upload(postImg,{folder: 'postImg'})
        const post = await Post.create({
            headline,
            subHeadline,
            caption,
            image,
        });
        return res.json({ post });
    }catch(e){
        console.log(e);
        return res.send(error(500,e.message));
    }
}

const bulkAddController = async(req,res)=>{
    try {
        const {data, category} = req.body;

        for(var i=0 ; i<data.length;i++){
            await Post.create({
                url:data[i]?.media,
                headline: data[i]?.title,
                subHeadline:data[i]?.excerpt,
                caption:data[i]?.summary,
                category: category,
            })
        }
        return res.send(success(201,"all done"))
    } catch (e) {
        res.send(error(500,e.message))
    }
}

const addPrefrences =async(req,res)=>{
    try {
        const {prefrences } = req.body;
        const userId = req._id;

        const user = await User.findById(userId);
        {prefrences.map(async(item)=>{

        await user.preference.push(item);
        })}
    
        await user.save();
        return res.send(success(201,"successfuly updated",{user}))

    } catch (e) {
        return res.send(error(500,e.message));
    }
}



module.exports = {
    createPostController,
    likeController,
    dislikesController,
    allPostController,
    addPrefrences,
    bulkAddController,
}