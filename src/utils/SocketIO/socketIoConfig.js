import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redisClient } from '../../utils/Redis/Redisconfig.js'; 

let io;

export const initSocket = (httpServer) => {
   
    io = new Server(httpServer, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });


    const pubClient = redisClient.duplicate();
    const subClient = redisClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        console.log(" Socket.io Redis Adapter connected");
    });

    io.on('connection', (socket) => {
        console.log(' User connected:', socket.id);

  
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User with ID: ${userId} joined their private room`);
        });

        socket.on('disconnect', () => {
            console.log(' User disconnected');
        });
    });

    return io;
};


export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};