import {Express} from "express";

import {UserController} from "../controllers/userController.js";

import {LoggerController} from "../controllers/loggerController.js";

export const userRoutes=(

app:
Express,

controller:
UserController,

loggerController:
LoggerController

)=>{
app.post("/api/users", (req,res)=>
controller.addUser(req, res));

app.get("/api/user", (req,res)=>
controller.getUser(req, res));

app.get("/api/users", (req,res)=>
controller.getAllUsers(res));

app.delete("/api/users", (req,res)=>
controller.removeUser(req, res));

app.put("/api/users", (req,res)=>
controller.updateUser(req, res));

app.get("/api/logger", (req,res)=>
loggerController.getLoggerArray(res));

};
