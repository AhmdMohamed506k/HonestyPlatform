
import userModel from '../../../db/models/user.model.js';
import messageModel from '../../../db/models/message.model.js';
import notificationModel from '../../../db/models/Notification.model.js';
import { redisClient } from '../../utils/Redis/Redisconfig.js';
import { getIO } from '../../utils/SocketIO/socketIoConfig.js';




export const message = async (req, res, next) => {
    try {

        if (!req.session.loggedIn) return res.redirect("/login");

        const userId = req.session.userId;
        const cacheKey = `user:messages:${userId}`;

      
        
          
        const cachedMessages = await redisClient.get(cacheKey);
         console.log(cacheKey);
         
        let messages;

        if (cachedMessages) {
            messages = JSON.parse(cachedMessages);
         
        } else {
          
            messages = await messageModel.find({ userId }).sort({ createdAt: -1 });
         
            await redisClient.setEx(cacheKey, 300, JSON.stringify(messages));
            
        }

       
        const user = await userModel.findOne({_id:userId});
        const url = `${req.protocol}://${req.headers.host}/user/${userId}`;

        res.render("massage.ejs", { 
            session: req.session, 
            link: url, 
            massage: messages, 
            user, 
            userImg: user.profileImg 
        });

    } catch (error) {
        console.log("Error in message page:", error);
        res.redirect("/login");
    }
}


export const sendMesg = async (req, res, next) => {
    try {
        const receiverId = req.params.id;
        const messageContent = req.body.masg;
        
        
        await messageModel.create({ contant: messageContent, userId: receiverId });

    

        
       await notificationModel.create({
            recipient: receiverId,
            content: "You got a new Message ! 🤫"
        });

   
        const io = getIO();
        io.to(receiverId).emit('new_message',{ 
            message: "You got a new Message! 🤫" 
        });




        await redisClient.del(`user:messages:${receiverId}`);
        res.redirect(`/user/${receiverId}`);


        
    } catch (error) {
        console.log("Error sending message:", error);
        res.status(500).send("Internal Server Error");
    }
}