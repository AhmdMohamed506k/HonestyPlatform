import userModel from "./../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../../utils/Cloudinary/Cloudinary.js";
import { sendEmail } from "../../utils/NodeMailer/SendEmail.js";
import session from "express-session";
import messageModel from "../../../db/models/message.model.js";
import notificationModel from "../../../db/models/Notification.model.js";
import { redisClient } from "../../utils/Redis/Redisconfig.js";
import { customAlphabet } from "nanoid";

// =====================MainPage==============================//
//view Function
export const sarahahIndex = (req, res, next) => {
  res.render("index.ejs");
};

// =====================Sendmessage==============================//
//view Function
export const user = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login");
    }

    const cacheKey = `user:profile:${userId}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      const userData = JSON.parse(cachedData);

      return res.render("user.ejs", {
        session: req.session,
        userImg: userData.profileImg,
        AboutUser: userData.about,
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.redirect("/login");
    }

    const profileData = {
      profileImg: user.profileImg,
      about: user.about,
    };

    await redisClient.setEx(cacheKey, 600, JSON.stringify(profileData));

    res.render("user.ejs", {
      session: req.session,
      userImg: user.profileImg,
      AboutUser: user.about,
    });
  } catch (err) {
    console.error("Error in user profile function:", err);
    next(err);
  }
};

// =====================ForgetPassword==============================//
//view Function
export const forgetPassPage = async (req, res, next) => {
  res.render("ForgetPassword.ejs");
};
export const VerificationCodePage = async (req, res, next) => {
  res.render("VerificationCodePage.ejs");
};
export const ChangeForgetPassPage = async (req, res, next) => {
  res.render("ChangeForgetPassPage.ejs");
};

//Back-end Function
export const sendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      req.flash("error", "Sorry Email is required");
      return res.redirect("/ForgetPassword");
    }

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      req.flash("error", "Sorry Email not found");
      return res.redirect("/ForgetPassword");
    }

    const generateCode = customAlphabet("1234567890qwertyuiopasgfdk", 6);
    const code = generateCode();

    userExist.VerificationCode = code;
    await userExist.save();

    req.session.resetEmail = email;

    req.session.isVerified = false;

    const SendedEmail = await sendEmail(
      email,
      "",
      `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-size: 600px; margin: 0 auto; border: 1px solid #efefef; border-radius: 15px; overflow: hidden; direction: ltr; text-align: left; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <div style="background-color: #007bff; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Password Reset</h1>
    </div>
    
    <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #333333; margin-top: 0; font-size: 20px;">Hello,</h2>
        <p style="color: #555555; font-size: 16px; line-height: 1.6;">
            We received a request to reset the password for your account. Please use the following verification code to proceed:
        </p>
        
        <div style="background-color: #f0f7ff; border: 2px dashed #007bff; border-radius: 10px; padding: 25px; text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 5px; font-family: monospace;">${code}</span>
        </div>
        
      
        <p style="color: #888888; font-size: 13px; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 20px;">
            If you did not request a password reset, please ignore this email or contact support if you have concerns. No changes will be made without this code.
        </p>
    </div>
    
    <div style="background-color: #f9f9f9; padding: 25px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee;">
        <p style="margin: 0; font-weight: bold;">© 2026 Honesty-Platform. All rights reserved.</p>
        <p style="margin: 8px 0 0 0;">Securing your digital experience.</p>
    </div>
</div>
  `,
    );

    req.flash("success", "Verification code Sended Successfully");
    return res.redirect("/VerificationCodePage");
  } catch (err) {
    console.log(err);
  }
};
//Back-end Function
export const CheckVerificationCode = async (req, res, next) => {
  try {
    const { VerificationCode } = req.body;
    const email = req.session.resetEmail;

    if (!email) {
      req.flash("error", "Session expired, please start over");
      return res.redirect("/ForgetPassword");
    }

    const userExist = await userModel.findOne({
      VerificationCode,
      VerificationCode: { $ne: null, $eq: VerificationCode },
    });
    if (!userExist) {
      req.flash("error", "Sorry Email not found");
      return res.redirect("/VerificationCodePage");
    }

    req.session.isVerified = true;

    req.flash("success", "valid Verification code ✅");
    return res.redirect("/ChangeForgetPassPage");
  } catch (err) {
    console.log(err);
  }
};
//Back-end Function
export const ChangeForgetpass = async (req, res, next) => {
  try {
    const { password, PasswordConfirmation } = req.body;

    const email = req.session.resetEmail;
    const isVerified = req.session.isVerified;

    if (!isVerified || !email) {
      req.flash("error", "Unauthorized access, please verify your email first");
      return res.redirect("/ForgetPassword");
    }

    if (password !== PasswordConfirmation) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/ChangeForgetPassPage");
    }

    const decodedPassword = await bcrypt.hash(password, 8);


       await userModel.findOneAndUpdate( 
            { email }, 
            { 
                password: decodedPassword, 
                VerificationCode: null, 
                isVerified: false 
            }
      );


delete req.session.resetEmail;
        delete req.session.isVerified;
  


    req.flash("success", "Password Changed successfully ✅");
    return res.redirect("/Login");
  } catch (err) {
    console.log(err);
  }
};

// =====================Register================================//
//Back-end Function
export const handleRegister = async (req, res, next) => {
  const { name, email, password, PasswordConfirmation, gender } = req.body;

  const UserExist = await userModel.findOne({ email });
  if (UserExist) {
   
    req.flash("error", "sorry Email is already registered");
    return res.redirect("/register");
  }
  if (password !== PasswordConfirmation) {
 
      req.flash("error", "sorry wrong PasswordConfirmation");
    return res.redirect("/register");
  }
  const DecodedPass = await bcrypt.hash(password, 10);

  await userModel.create({ name, email, password: DecodedPass, gender });
  res.redirect("/message");
};
//view Function
export const register = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/message");
  }
  res.render("register.ejs");
};

// =====================Login===================================//
//Back-end Function
export const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email });

  if (!userExist) {
    req.flash("error", "Sorry Email not found");
    return res.redirect("/login");
  }

  if (!password || !bcrypt.compareSync(password, userExist.password)) {
    req.flash("error", "Sorry Wrong password");
    return res.redirect("/login");
  }

  req.session.userId = userExist._id;
  req.session.userName = userExist.name;
  req.session.loggedIn = true;

  res.redirect("/message");
};
//view Function
export const login = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/message");
  }

  res.render("login.ejs");
};

// =====================LogOut==================================//
//view Function
export const logout = (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};

// =====================ChangeUserData==========================//

//view Function
export const ChangeUserData = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.session.userId);

    if (!user) {
      return res.redirect("/login");
    }
    await redisClient.del(`user:profile:${req.session.userId}`);
    req.session.userImg = user.userImg;

      const notificationCount = await notificationModel.countDocuments({ notificationCount: false })


     const notifications = await notificationModel.find({ recipient: req.session.userId })
        .sort({ createdAt: -1 })
        .limit(10); 
            


    res.render("UserSettings.ejs", {
      session: req.session,
      user: user,
      falseNotificationCount:notificationCount,
      notifications:notifications,
      userName: user.name,
      userImg: user.profileImg,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

// =====================ChangeUserProfileImage==========================//
//Back-end Function
export const handelChangeUserProfileImg = async (req, res, next) => {
  try {
    const UserExist = await userModel.findOne({ _id: req.session.userId });
    if (!UserExist) {
      req.flash("error", "User not found");
      return res.redirect("/ChangeUserData");
    }
    if (!req.file) {
      req.flash("error", "Image  require");
      return res.redirect("/ChangeUserData");
    }
    if (UserExist.profileImg.public_id) {
      await cloudinary.uploader.destroy(UserExist.profileImg.public_id);
    }

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `Honesty_platform/Users/${UserExist._id}/UserProfileImage`,
      },
    );

    UserExist.profileImg = { public_id, secure_url };
    await UserExist.save();

    await redisClient.del(`user:profile:${req.session.userId}`);

    req.session.userImg = secure_url;

    req.flash("success", "Profile Image updated successfully");
    return res.redirect("/message");
  } catch (err) {
    console.log(err);
  }
};

// =====================ChangeUserpassword==========================//
//Back-end Function
export const handelChangeUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, PasswordConfirmation } = req.body;

    if (!oldPassword || !newPassword || !PasswordConfirmation) {
      req.flash("error", "All fields are required");
      return res.redirect("/ChangeUserData");
    }

    const user = await userModel.findOne({ _id: req.session.userId });
    if (!user) {
      req.flash("error", "User not Exists");
      return res.redirect("/login");
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      req.flash("error", "Sorry old user password is wrong");
      return res.redirect("/ChangeUserData");
    }

    if (newPassword !== PasswordConfirmation) {
      req.flash("error", "Sorry incorrect Password Confirmation");
      return res.redirect("/ChangeUserData");
    }

    const newdecodedpass = bcrypt.hashSync(newPassword, 10);
    user.password = newdecodedpass;
    await user.save();
    await redisClient.del(`user:profile:${req.session.userId}`);

    req.flash("success", "Password updated successfully");
    return res.redirect("/ChangeUserData");
  } catch (err) {
    console.log(err);
    res.redirect("/ChangeUserData");
  }
};
// =====================handelChangeUserInformations==========================//
//Back-end Function
export const handelChangeUserInformations = async (req, res, next) => {
  try {
    const { name, gender, about } = req.body;

    if (!name || !gender || !about) {
      req.flash("error", "All fields are required");
      return req.session.save(() => res.redirect("/ChangeUserData"));
    }

    const user = await userModel.findOne({ _id: req.session.userId });

    if (!user) {
      req.flash("error", "User not found");
      return req.session.save(() => res.redirect("/login"));
    }

    user.name = name.toLowerCase();
    user.gender = gender;
    user.about = about;

    await user.save();

    req.session.userName = user.name;
    await redisClient.del(`user:profile:${req.session.userId}`);

    req.flash("success", "Information updated successfully");

    req.session.save(() => {
      res.redirect("/ChangeUserData");
    });
  } catch (err) {
    console.log("Update Info Error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/ChangeUserData");
  }
};

// =====================handelDeleteUserInformations==========================//
//Back-end Function
export const handelDeleteUserAccount = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      req.flash("error", "Email is required to confirm deletion");
      return req.session.save(() => res.redirect("/ChangeUserData"));
    }

    const user = await userModel.findOne({ _id: req.session.userId });

    if (!user || user.email !== email) {
      req.flash("error", "Email does not match our records");
      return req.session.save(() => res.redirect("/ChangeUserData"));
    }

    await messageModel.deleteMany({ userId: req.session.userId });

    if (user.profileImg?.public_id) {
      await cloudinary.uploader.destroy(user.profileImg.public_id);
    }

    await userModel.findOneAndDelete({_id:req.session.userId});

    await redisClient.del(`user:profile:${req.session.userId}`);

    req.session.destroy((err) => {
      if (err) console.log(err);
      res.redirect("/login");
    });
  } catch (err) {
    console.log("Delete Error:", err);
    req.flash("error", "Something went wrong during deletion");
    res.redirect("/ChangeUserData");
  }
};
