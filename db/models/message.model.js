import mongoose, { model, Types } from "mongoose";




const messageSchema = new mongoose.Schema({
    contant: String,
    userId: {
        type: Types.ObjectId,
        ref:"ref"
    }
})


messageSchema.index({userId:1},{unique:1})
const messageModel = model("message", messageSchema);



export default messageModel