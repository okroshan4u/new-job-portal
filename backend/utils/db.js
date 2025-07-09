import mongoose from "mongoose";
const connetDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb conneted succesfully");
    } catch (error) {
        console.log(error)
    }
}

export default connetDB;