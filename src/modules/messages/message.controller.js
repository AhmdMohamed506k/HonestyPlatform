
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
         
         
        let messages;

        if (cachedMessages) {
            messages = JSON.parse(cachedMessages);
             
        } else {
          
            messages = await messageModel.find({ userId }).sort({ createdAt: -1 });
            
            await redisClient.setEx(cacheKey, 300, JSON.stringify(messages));
            
        }




        const notifications = await notificationModel.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .limit(10); 
            

        const notificationCount = await notificationModel.countDocuments({ notificationCount: false })
        const user = await userModel.findOne({_id:userId});
        const url = `${req.protocol}://${req.headers.host}/user/${userId}`;
  

  
     


        res.render("massage.ejs", { 
            session: req.session, 
            link: url, 
            massage: messages, 
            massageLength: messages.length,
            notifications:notifications, 
            falseNotificationCount:notificationCount,
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

      
        const newMessage = await messageModel.create({ 
            contant: messageContent, 
            userId: receiverId 
        });
        const totalMessagesCount = await messageModel.countDocuments({ userId: receiverId });
      
        await notificationModel.create({
            recipient: receiverId,
            content: "You got a new Message ! 🤫"
        });

   
        const io = getIO();
        io.to(receiverId.toString()).emit('receiveRealTimeMessage', { 
            message: messageContent,
            messageCount:totalMessagesCount,
            notification: "You got a new Message! 🤫",
            createdAt: newMessage.createdAt 
        });

        
        await redisClient.del(`user:messages:${receiverId}`);

       
        req.flash("success", "Your secret message has been sent! 🚀");
        res.redirect(`/user/${receiverId}`);

    } catch (error) {
        console.error("Error sending message:", error);
        req.flash("error", "Failed to send message. Please try again.");
        res.redirect("back"); 
    }
}