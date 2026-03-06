import Joi from "joi";






export const RegisterValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).trim().required(),
        email: Joi.string().email().required().messages({ 'string.email': 'Please enter a valid email address' }),
        password: Joi.string().min(6).max(100).required(),
        PasswordConfirmation: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' }),
        gender: Joi.string().valid('male', 'female').required()
    }),
};
export const LoginValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
};


export const sendVerificationCodeValidation = {
    body: Joi.object({
        email: Joi.string().email().required()
    }),
};
export const CheckVerificationCodeValidation = {
    body: Joi.object({
        VerificationCode: Joi.string().required().min(6).max(6)
    })
};
export const ChangeForgetpassValidation = {
    body: Joi.object({
        password: Joi.string().min(6).required(),
        PasswordConfirmation: Joi.string().valid(Joi.ref('password')).required().messages({'any.only': 'Confirmation password must match new password'})
    }),
};



export const handelChangeUserPasswordValition = {
    body: Joi.object({
        oldPassword: Joi.string().required(),
        password: Joi.string().min(6).required(),
        PasswordConfirmation: Joi.string().valid(Joi.ref('password')).required()

    }),
};
export const handelChangeUserInformationsValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).trim().required(),
        gender: Joi.string().email().required().messages({ 'string.email': 'Please enter a valid email address' }),
        about: Joi.string().min(3).max(1500).trim().required(),
    }),
};
export const handelDeleteUserAccountValidation = {
    body: Joi.object({
        email: Joi.string().email().required()
    }),
};
