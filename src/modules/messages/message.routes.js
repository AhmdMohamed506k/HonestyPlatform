
import { Router  } from "express"
import { message, sendMesg } from "./message.controller.js";
import * as Msv from "./Message.validation.js"
import  ProtectRoutes  from "../../middleware/ProtectRoutes/PortectRoutes.js";
import { validate } from "../../middleware/Validations/Validation.js";




const messageRouter = Router()



messageRouter.get("/message",ProtectRoutes, message);


messageRouter.post("/sendMasg/:id",validate(Msv.sendMessageParams) , sendMesg);




export default messageRouter