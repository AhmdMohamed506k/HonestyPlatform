import notificationModel from "../../../db/models/Notification.model.js";






export const GetUnreadedNotifications= async (req, res ,next)=>{
    try{
     
     const userId = req.session.userId;

     const UnReadedNotifications = await notificationModel.find({
        recipient:userId,
     }).sort({ createdAt: -1 }).limit(5)

     
     const UnReadedNotificationsCount= await notificationModel.countDocuments({
        recipient:userId,
        isRead:false
     })
        
      
  
     
    res.status(200).json({status:"Success",notifications:UnReadedNotifications, UnreadedCount:UnReadedNotificationsCount})
     
         
       
    }catch(err){
        console.log(err);
        
    }

}

export const MarkasReaded= async(req,res,next)=>{
    try{
       const userId = req.session.userId;
        

        await  notificationModel.updateMany({recipient:userId , isRead:false},{$set :{isRead:true}});



        res.status(200).json({status:"success",Msg:"done"})
     



    }catch(err){
        console.log(err);
        
    }
}