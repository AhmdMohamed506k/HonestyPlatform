
import { Router } from "express";
import * as Us from "./user.controller.js";
import  {multerHost, validExtentions } from "../../middleware/MuterHost/MulterHost.js"



const userRouter = Router();


// =====================MainPage==================================//
userRouter.get("/Home", Us.sarahahIndex);

// =====================SendMassage==============================//
userRouter.get("/User/:id", Us.user);
userRouter.get("/User", Us.user);

// =====================Register================================//
userRouter.post("/HandleRegister", Us.handleRegister);
userRouter.get("/Register", Us.register);

// =====================Login===================================//
userRouter.post("/handleLogin", Us.handleLogin);
userRouter.get("/Login", Us.login);

// =====================LogOut===================================//
userRouter.get("/Logout", Us.logout);

// =====================ChangeUserData===========================//

userRouter.get("/ChangeUserData", Us.ChangeUserData);

// =====================ChangeUserProfileImage===========================//
userRouter.post("/handelChangeUserProfileImg",multerHost(validExtentions.image).single("image"), Us.handelChangeUserProfileImg);

// =====================ChangeUserpassword==========================//
userRouter.post("/handelChangeUserPassword", Us.handelChangeUserPassword);

// =====================ChangeUserInformation==========================//

userRouter.post("/handelChangeUserInformations", Us.handelChangeUserInformations);

// =====================handelDeleteUserAccount==========================//
userRouter.post("/handelDeleteUserAccount", Us.handelDeleteUserAccount);

export default userRouter;