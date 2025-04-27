var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SOCKET } from "../config/userConfig.js";
export const userRoutes = (req, res, controller, loggerController) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, url } = req;
    const pathName = new URL(url, SOCKET).pathname;
    switch (pathName + method) {
        case "/api/users" + "POST": {
            yield controller.addUser(req, res);
            break;
        }
        case "/api/user" + "GET": {
            controller.getUser(req, res);
            break;
        }
        case "/api/users" + "DELETE": {
            yield controller.removeUser(req, res);
            break;
        }
        case "/api/users" + "PUT": {
            yield controller.updateUser(req, res);
            break;
        }
        case "/api/users" + "GET": {
            controller.getAllUsers(res);
            break;
        }
        case '/api/logger' + 'GET': {
            loggerController.getLoggerArray(res);
            break;
        }
        default: {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Error!");
        }
    }
});
