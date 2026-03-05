import express from "express";
import session from 'express-session';
import { createServer } from 'http';
import { initSocket } from './src/utils/SocketIO/socketIoConfig.js';
import userRouter from "./src/modules/users/user.routes.js";
import messageRouter from "./src/modules/messages/message.routes.js";
import connectionDB from "./db/connectionDB.js";
import flash from "connect-flash"
import {connectRedis ,redisClient} from "./src/utils/Redis/Redisconfig.js";
import RedisStore from "connect-redis";
import NotificationsRouter from "./src/modules/Notifications/Notifications.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv"


dotenv.config()


const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);
initSocket(httpServer);




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


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
    res.locals.validationErrors = req.flash("validationErrors"); 
    res.locals.user = req.session.user || null;
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
});


app.get('/', (req, res) => {
    res.redirect('/Home'); 
});
app.use(userRouter);
app.use(NotificationsRouter);
app.use(messageRouter);


connectionDB();
connectRedis()




httpServer.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});