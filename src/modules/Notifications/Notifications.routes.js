import Router from "express";
import * as No from "./Notifications.controller.js"







const NotificationsRouter = Router();




NotificationsRouter.get('/UserNotifications', No.GetUnreadedNotifications);
NotificationsRouter.post('/UserNotifications/mark-as-read', No.MarkasReaded);



export default NotificationsRouter;