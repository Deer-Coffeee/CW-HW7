import express from "express";

import {PORT} from "./config/userConfig.js";

import {UserController} from "./controllers/userController.js";

import {LoggerController} from "./controllers/loggerController.js";

import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";

import {logger} from "./events/logger.js";

import {userRoutes} from "./routes/userRoutes-express.js";

export const launchServer = () =>{

const app = express();

app.use(express.json());

const userService = new UserServiceEmbeddedImpl();

userService.restoreDataFromFile();

const userController = new UserController(userService);

const loggerController = new LoggerController();

userRoutes(app, userController,loggerController);

app.listen(PORT,()=>{

console.log(`Express server started on http://localhost:${PORT}`);

});

process.on("SIGINT",()=>{

userService.saveDataToFile();

logger.log("Saving");

logger.saveToFile("Server shutdown by Ctrl+C");

process.exit();

});
};
