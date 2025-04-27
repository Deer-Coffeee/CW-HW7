import { logger } from "../events/logger.js";
export class LoggerController {
    constructor() {
    }
    getLoggerArray(res) {
        logger.log('logger controller got request for logArrayData');
        const logs = logger.getLogArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(logs));
        logger.log('Success');
    }
}
