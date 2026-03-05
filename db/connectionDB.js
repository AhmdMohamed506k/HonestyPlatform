import mongoose  from "mongoose"




const connectionDB = async() => {
    return await mongoose.connect(`mongodb+srv://ahmed:${process.env.DBPassword}@honsety.dy1qa98.mongodb.net/?appName=Honsety`)


    .then(() => console.log("successfully connected LOL :)"))
    .catch((error) => console.log("catch Error", error));



}

export default connectionDB