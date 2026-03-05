
import { Router } from "express";
import * as Us from "./user.controller.js";
import * as UsV from "./User.validation.js";
import ProtectRoutes from "../../middleware/ProtectRoutes/PortectRoutes.js"
import  {multerHost, validExtentions } from "../../middleware/MuterHost/MulterHost.js"
import { validate } from "../../middleware/Validations/Validation.js";



const userRouter = Router();


// =====================MainPage==================================//
userRouter.get("/", Us.sarahahIndex);

// =====================SendMassage==============================//
userRouter.get("/User/:id", Us.user);
userRouter.get("/User", Us.user);
// =====================ForgetPass================================//
userRouter.get("/ForgetPassword", Us.forgetPassPage);
userRouter.get("/VerificationCodePage", Us.VerificationCodePage);
userRouter.get("/ChangeForgetPassPage", Us.ChangeForgetPassPage);

userRouter.post("/sendVerificationCode",validate(UsV.sendVerificationCodeValidation) , Us.sendVerificationCode);
userRouter.post("/CheckVerificationCode",validate(UsV.CheckVerificationCodeValidation), Us.CheckVerificationCode);
userRouter.post("/ChangeForgetpass",validate(UsV.ChangeForgetpassValidation) , Us.ChangeForgetpass);






// =====================Register================================//
userRouter.post("/HandleRegister",validate(UsV.RegisterValidation),  Us.handleRegister);
userRouter.get("/Register", Us.register);

// =====================Login===================================//
userRouter.post("/handleLogin",validate(UsV.LoginValidation), Us.handleLogin);
userRouter.get("/Login", Us.login);

// =====================LogOut===================================//
userRouter.get("/Logout",ProtectRoutes, Us.logout);

// =====================ChangeUserData===========================//

userRouter.get("/ChangeUserData",ProtectRoutes, Us.ChangeUserData);

// =====================ChangeUserProfileImage===========================//
userRouter.post("/handelChangeUserProfileImg",ProtectRoutes,  multerHost(validExtentions.image).single("image"), Us.handelChangeUserProfileImg);

// =====================ChangeUserpassword==========================//
userRouter.post("/handelChangeUserPassword",ProtectRoutes,validate(UsV.handelChangeUserPasswordValition) , Us.handelChangeUserPassword);

// =====================ChangeUserInformation==========================//

userRouter.post("/handelChangeUserInformations",ProtectRoutes, validate(UsV.handelChangeUserInformationsValidation) , Us.handelChangeUserInformations);

// =====================handelDeleteUserAccount==========================//
userRouter.post("/handelDeleteUserAccount",ProtectRoutes,validate(UsV.handelDeleteUserAccountValidation) , Us.handelDeleteUserAccount);

export default userRouter;