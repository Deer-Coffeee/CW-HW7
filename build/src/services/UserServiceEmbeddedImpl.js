import fs from "fs";
import { logger } from "../events/logger.js";
export class UserServiceEmbeddedImpl {
    constructor() {
        this.users = [{ id: 1, userName: "Bond" }];
        this.rs = fs.createReadStream('data.txt', { highWaterMark: 24 });
        this.ws = fs.createWriteStream('data.txt', { flags: "r+" });
    }
    addUser(user) {
        if (this.users.findIndex(u => u.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }
    getUser(userId) {
        const index = this.users.findIndex(item => item.id === userId);
        return index === -1 ? null : this.users[index];
    }
    removeUser(userId) {
        const index = this.users.findIndex(item => item.id === userId);
        if (index === -1)
            return null;
        const removedUser = this.users.splice(index, 1);
        return removedUser[0];
    }
    updateUser(newUserData) {
        const index = this.users.findIndex(item => item.id === newUserData.id);
        if (index === -1)
            return false;
        this.users[index] = newUserData;
        return true;
    }
    getAllUsers() {
        return [...this.users];
    }
    restoreDataFromFile() {
        let result = "";
        this.rs.on('data', (chunk) => {
            if (chunk) {
                result += chunk.toString();
            }
            else {
                result = "[]";
            }
        });
        this.rs.on('end', () => {
            console.log("result ", result);
            if (result) {
                this.users = JSON.parse(result);
                logger.log("Data was restored from file");
                logger.save("Data was restored from file");
                this.rs.destroy();
            }
            else {
            }
        });
        this.rs.on("error", () => {
            this.users = [{ id: 2, userName: "Trinity" }];
            logger.log("File to restore not found");
        });
        return "Ok";
    }
    saveDataToFile() {
        fs.truncateSync('data.txt', 0);
        const data = JSON.stringify(this.users);
        this.ws.write((data));
        this.ws.on('end', () => {
            logger.log("Data was saved to file");
            logger.save("Data was saved to file");
            this.ws.destroy();
        });
        this.ws.on('error', () => {
            logger.log("Error! Problem with writing data to file");
        });
        return "Ok";
    }
}
