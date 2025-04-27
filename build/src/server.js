var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createServer } from "node:http";
import { PORT } from "./config/userConfig.js";
import { UserController } from "./controllers/userController.js";
import { userRoutes } from "./routes/userRoutes.js";
import { UserServiceEmbeddedImpl } from "./services/UserServiceEmbeddedImpl.js";
import { LoggerController } from "./controllers/loggerController.js";
import { logger } from "./events/logger.js";
export const launchServer = () => {
    const userService = new UserServiceEmbeddedImpl();
    userService.restoreDataFromFile();
    const userController = new UserController(userService);
    const loggerController = new LoggerController();
    createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield userRoutes(req, res, userController, loggerController);
    })).listen(PORT, () => {
        console.log(`Started at http://localhost:${PORT}`);
    });
    process.on('SIGINT', () => {
        userService.saveDataToFile();
        logger.log("Saving");
        logger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    });
};
