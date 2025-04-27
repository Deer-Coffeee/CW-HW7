import EventEmitter from "node:events";
import fs from 'fs';
class Logger extends EventEmitter {
    constructor() {
        super(...arguments);
        this.logArray = [];
    }
    log(message) {
        this.emit('logged', message);
    }
    addLogToArray(message) {
        this.logArray.push({ date: new Date().toISOString(), message });
    }
    getLogArray() {
        return [...this.logArray];
    }
    save(message) {
        this.emit('saved', message);
    }
    saveToFile(message) {
        this.emit('to_file', message);
    }
}
export const logger = new Logger();
logger.on('logged', (message) => {
    console.log(new Date().toISOString(), message);
});
logger.on('saved', (message) => {
    logger.addLogToArray(message);
});
logger.on('to_file', (message) => {
    logger.addLogToArray(message);
    let temp = new Date().toISOString().replace(/[-:T]/g, "_");
    const fileName = `log${temp}.txt`;
    fs.writeFileSync(fileName, JSON.stringify(logger.getLogArray()));
});
