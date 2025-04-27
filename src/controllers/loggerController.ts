import {logger} from "../events/logger.js";
import {ServerResponse} from "node:http";

export class LoggerController {
    constructor() {
    }

    getLoggerArray(res: ServerResponse) {
        logger.log('logger controller got request for logArrayData')
        const logs = logger.getLogArray();
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(logs))
        logger.log('Success')
    }
}