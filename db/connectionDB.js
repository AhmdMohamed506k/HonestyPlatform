import mongoose  from "mongoose"




const connectionDB = async() => {
    return await mongoose.connect("mongodb://0.0.0.0:27017/sarahaha")


    .then(() => console.log("successfully connected LOL :)"))
    .catch((error) => console.log("catch Error", error));



}

export default connectionDB