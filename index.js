import express from "express";
import session from 'express-session';
import { createServer } from 'http';
import { initSocket } from './src/utils/SocketIO/socketIoConfig.js';
import userRouter from "./src/modules/users/user.routes.js";
import messageRouter from "./src/modules/messages/message.routes.js";
import connectionDB from "./db/connectionDB.js";
import flash from "connect-flash"
import {connectRedis ,redisClient} from "./src/utils/Redis/Redisconfig.js";
import { RedisStore } from "connect-redis";

const app = express();
const port = 4000;

const httpServer = createServer(app);
initSocket(httpServer);


let redisStore = new RedisStore({
  client: redisClient,
  prefix: "Honsty_session:", 
});


app.use(session({
    store: redisStore, 
    secret: 'SecretHonsty2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
        secure: false 
    }
}));

app.use(flash())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public"));
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});





app.use(userRouter);
app.use(messageRouter);


connectionDB();
connectRedis()




httpServer.listen(3000, () => {
 console.log(' Server is running on port 3000');
});
app.listen(port, () =>
 console.log(`Server is running on port ${port}!`
));