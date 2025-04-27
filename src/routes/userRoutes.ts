import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/userController.js";
import {SOCKET} from "../config/userConfig.js";
import {LoggerController} from "../controllers/loggerController.js";

export const userRoutes = async (req:IncomingMessage, res:ServerResponse, controller:UserController, loggerController:LoggerController) => {

    const {method, url} =  req;
    const pathName = new URL(url!, SOCKET).pathname;

    switch (pathName + method){
        case "/api/users" + "POST":{
            await controller.addUser(req, res)
            break;
        }
        case "/api/user" + "GET": {
            controller.getUser(req, res);
            break;
        }
        case "/api/users" + "DELETE": {
            await controller.removeUser(req, res)
            break;
        }
        case "/api/users" + "PUT":{
            await  controller.updateUser(req, res)
            break;
        }
        case "/api/users" + "GET":{
            controller.getAllUsers(res)
            break;
        }
        case '/api/logger' + 'GET':{
            loggerController.getLoggerArray(res);
        break;
        }

        default: {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end("Error!")
        }
    }
}