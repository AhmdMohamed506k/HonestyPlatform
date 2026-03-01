import userModel from "./../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../../utils/Cloudinary/Cloudinary.js";
import session from "express-session";
import messageModel from "../../../db/models/message.model.js";
import { redisClient } from '../../utils/Redis/Redisconfig.js';



// =====================MainPage==============================//
//view Function
export const sarahahIndex = (req, res, next) => {
  res.render("index.ejs");
};

// =====================SendMassage==============================//
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
      about: user.about
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

// =====================Register================================//
//Back-end Function
export const handleRegister = async (req, res, next) => {
  const { name, email, password, PasswordConfirmation ,gender } = req.body;

  const UserExist = await userModel.findOne({ email });
  if (UserExist) {
    return res.redirect("/register?error=sorry Email is already registered ");
  }
  if (password !== PasswordConfirmation) {
    return res.redirect("/register?error=sorry wrong PasswordConfirmation ");
  }
  const DecodedPass = await bcrypt.hash(password, 10);

  await userModel.create({ name, email, password: DecodedPass ,gender});
  res.redirect("/massage");
};
//view Function
export const register = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/massage");
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

  res.redirect("/massage");
};
//view Function
export const login = (req, res, next) => {

  if (req.session.loggedIn) {
    return res.redirect("/massage");
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



    res.render("UserSettings.ejs", {
      session: req.session, 
      user: user,
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
    const UserExist = await userModel.findOne({_id:req.session.userId});
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
    return res.redirect("/massage");
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

    const user = await userModel.findOne({_id:req.session.userId} );
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
// =====================ChangeUserpassword==========================//
//Back-end Function
export const handelChangeUserInformations = async (req, res, next) => {
  try {
    const { name, gender, about } = req.body;

  
        
    if (!name || !gender || !about) {
        req.flash("error", "All fields are required");
        return req.session.save(() => res.redirect("/ChangeUserData"));
    }

   
    const user = await userModel.findOne({_id:req.session.userId});
 
    
     

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
    
   
    req.session.save(() => { res.redirect("/ChangeUserData"); });

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

 
    const user = await userModel.findOne({_id:req.session.userId});
   
    
    if (!user || user.email !== email) {
      req.flash("error", "Email does not match our records");
      return req.session.save(() => res.redirect("/ChangeUserData"));
    }

   
    await messageModel.deleteMany({ userId: req.session.userId }); 

    
    if (user.profileImg?.public_id) {
      await cloudinary.uploader.destroy(user.profileImg.public_id);
    }

    await userModel.findOneAndDelete(req.session.userId);

    await redisClient.del(`user:profile:${req.session.userId}`);


    req.session.destroy((err) => {
      if (err) console.log(err);
      res.redirect("/login?message=AccountDeleted"); 
    });

  } catch (err) {
    console.log("Delete Error:", err);
    req.flash("error", "Something went wrong during deletion");
    res.redirect("/ChangeUserData");
  }
};