import multer from "multer"




export const validExtentions ={
 image: [
     "image/png",
     "image/jpg", 
     "image/jpeg"
  ],
}




export const multerHost = (customvalidtion)=>{


    const  storage = multer.diskStorage({});


    const filter = function(file,req,cb){
        if(customvalidtion.includes(file.mimetype)){

            return cb(null,true);

        }
        return cb(new Error("file not supported", false));
    }


    const upload = multer({storage , filter})
    return upload


}