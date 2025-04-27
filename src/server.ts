import {createServer} from "node:http";
import {PORT} from "./config/userConfig.js";
import {UserController} from "./controllers/userController.js";
import {userRoutes} from "./routes/userRoutes.js";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";
import {LoggerController} from "./controllers/loggerController.js";
import {logger} from "./events/logger.js";

export const launchServer = () => {

    const userService = new UserServiceEmbeddedImpl();
    userService.restoreDataFromFile();
    const userController = new UserController(userService)
    const loggerController = new LoggerController();

    createServer(async (req, res) => {
        await userRoutes(req, res, userController, loggerController)
    }).listen(PORT, () => {
        console.log(`Started at http://localhost:${PORT}`)
    })
    process.on('SIGINT', () => {
        userService.saveDataToFile();
        logger.log("Saving")
        logger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    })
}