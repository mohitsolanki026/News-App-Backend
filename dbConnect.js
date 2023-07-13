const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config("./.env");

module.exports = async () =>{
    const mongoUri = `mongodb+srv://Mohit:${process.env.MONGODB_PASSWORD}@cluster1.pbeklvl.mongodb.net/?retryWrites=true&w=majority`
    try{
        const connect = await mongoose.connect(mongoUri, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);

    }catch (error){
        console.log(error);
        process.exit(1);
    }
}


