
import { Router  } from "express"
import { message, sendMesg } from "./message.controller.js";



const messageRouter = Router()



messageRouter.get("/message", message);


messageRouter.post("/sendMasg/:id", sendMesg);




export default messageRouter