import mongoose, { model, Types } from "mongoose";




const notificationSchema = new mongoose.Schema({
  recipient: { // the user that will recive 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  }, 
  content: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});






notificationSchema.index({recipient:1},{unique:1});
const notificationModel = model("notification", notificationSchema);

export default notificationModel