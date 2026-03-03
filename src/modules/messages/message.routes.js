
import { Router  } from "express"
import { message, sendMesg } from "./message.controller.js";
import  ProtectRoutes  from "../../middleware/ProtectRoutes/PortectRoutes.js";



const messageRouter = Router()



messageRouter.get("/message",ProtectRoutes, message);


messageRouter.post("/sendMasg/:id", sendMesg);




export default messageRouter