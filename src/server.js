import app from "./index.js";
import mongoose from "mongoose";
import { initSocket } from "./socket.js";
import config from "./config/config.js";
import http from 'http';

let server;

mongoose.connect(config.mongo.uri).then(() => {
    console.info("Connected to MongoDb url: ", config.mongo.uri);

    const httpServer = http.createServer(app);

    initSocket(httpServer);

    server = httpServer.listen(config.port, () => {
        console.info(`Server listening on port ${config.port}`);
    });

}).catch((err) => {
    console.error("Error connecting mongodb: ", err)
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    if (server) server.close(() => process.exit(1));
});