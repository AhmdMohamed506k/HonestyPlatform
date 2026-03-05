import Joi from "joi";




export const sendMessageParams = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required() 
    })
};
