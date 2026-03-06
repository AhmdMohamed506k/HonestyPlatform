import mongoose, { model, Types } from "mongoose";




const messageSchema = new mongoose.Schema({
    contant: String,
    userId: {
        type: Types.ObjectId,
        ref:"user"
    }
},{ timestamps: true })



const messageModel = model("message", messageSchema);



export default messageModel