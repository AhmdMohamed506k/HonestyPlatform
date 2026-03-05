import joi from "joi"


const dataMethod = ["body","params","file","files"];


export const validate =(schema)=>{

    return(req,res,next)=>{
        

        const ArryError =[]
        
        dataMethod.forEach((key)=>{
            if(schema[key]){

             const {error}= schema[key].validate(req[key],{abortEarly: false});
             if(error?.details){
                ArryError.push(error.details)
             }

            }

        })

        if(ArryError.length){

           const errorMessages = ArryError.flat().map(err => err.message);

           req.flash("error", errorMessages); 
    
 
           return res.redirect(req.header('Referer') || '/');


        }
        
        next()

    }

}

