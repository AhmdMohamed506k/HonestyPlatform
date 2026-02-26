
import { Router  } from "express"
import { message, sendMesg } from "./message.controller.js";



const messageRouter = Router()



messageRouter.get("/massage", message);


messageRouter.post("/sendMasg/:id", sendMesg);




export default messageRouter