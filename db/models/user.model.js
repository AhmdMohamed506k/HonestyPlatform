import mongoose, { model } from "mongoose";




const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    profileImg:{
      public_id:{type:String,default:null},
      secure_url:{type:String ,default:null},
      
    },
    gender:{
      type:String,
      enum:["male","female"],
      default:"male"
    },
    about:{
      type:String,
      default:null,
    },
     isVerified:{
      type:Boolean,
      default:false
    },
     VerificationCode:{
      type:String,
      default:null
    },
    
    password: String,
    PasswordConfirmation:String,
  
})

userSchema.virtual('myNotifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'recipient'
});


userSchema.index({email:1},{unique:true})
const userModel = model("user", userSchema);
export default userModel;