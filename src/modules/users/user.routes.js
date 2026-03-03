
import { Router } from "express";
import * as Us from "./user.controller.js";
import ProtectRoutes from "../../middleware/ProtectRoutes/PortectRoutes.js"
import  {multerHost, validExtentions } from "../../middleware/MuterHost/MulterHost.js"



const userRouter = Router();


// =====================MainPage==================================//
userRouter.get("/Home", Us.sarahahIndex);

// =====================SendMassage==============================//
userRouter.get("/User/:id", Us.user);
userRouter.get("/User", Us.user);
// =====================ForgetPass================================//
userRouter.get("/ForgetPassword", Us.forgetPassPage);
userRouter.get("/VerificationCodePage", Us.VerificationCodePage);
userRouter.get("/ChangeForgetPassPage", Us.ChangeForgetPassPage);

userRouter.post("/sendVerificationCode", Us.sendVerificationCode);
userRouter.post("/CheckVerificationCode", Us.CheckVerificationCode);
userRouter.post("/ChangeForgetpass", Us.ChangeForgetpass);






// =====================Register================================//
userRouter.post("/HandleRegister", Us.handleRegister);
userRouter.get("/Register", Us.register);

// =====================Login===================================//
userRouter.post("/handleLogin", Us.handleLogin);
userRouter.get("/Login", Us.login);

// =====================LogOut===================================//
userRouter.get("/Logout",ProtectRoutes, Us.logout);

// =====================ChangeUserData===========================//

userRouter.get("/ChangeUserData",ProtectRoutes, Us.ChangeUserData);

// =====================ChangeUserProfileImage===========================//
userRouter.post("/handelChangeUserProfileImg",ProtectRoutes,  multerHost(validExtentions.image).single("image"), Us.handelChangeUserProfileImg);

// =====================ChangeUserpassword==========================//
userRouter.post("/handelChangeUserPassword",ProtectRoutes, Us.handelChangeUserPassword);

// =====================ChangeUserInformation==========================//

userRouter.post("/handelChangeUserInformations",ProtectRoutes, Us.handelChangeUserInformations);

// =====================handelDeleteUserAccount==========================//
userRouter.post("/handelDeleteUserAccount",ProtectRoutes, Us.handelDeleteUserAccount);

export default userRouter;