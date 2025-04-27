import {Request, Response} from "express";

import {UserService} from "../services/UserService.js";

import {User} from "../model/userTypes.js";

import {logger} from "../events/logger.js";

export class UserController{
constructor(private userService: UserService){}

async addUser(req: Request, res: Response){

logger.log("Request for adding new user was received");

const user = req.body as User;
const isSuccess = this.userService.addUser(user);

if(isSuccess){

res.status(200).send("User added");

logger.log("New user was successfully added");
logger.save("New user was successfully added");

}else{

res.status(409).send("User already exists");

logger.log("User not added — duplicate ID");
}
}

getUser(req: Request,res: Response){

logger.log("Request to get user data");

const id=Number(req.query.userId);

if(isNaN(id)){

res.status(400).send("Request must contain a valid user ID");
logger.log("Request without valid ID");

return;

}
const user = this.userService.getUser(id);
if(user) {
res.status(200).json(user);

logger.log("User found and returned");

}else{
res.status(404).send(`User not found with id ${id}`);

logger.log("User not found");
}
}

async removeUser(req: Request, res: Response){

logger.log("Request to remove user received");

const {id} = req.body;

const removedUser = this.userService.removeUser(id);

if(removedUser){

res.status(200).json(removedUser);

logger.log("User removed");
logger.save("User removed");

}else{
res.status(404).send(`User with id ${id} not found`);

logger.log("User not found for removal");
}
}

async updateUser(req: Request,res: Response){

logger.log("Request to update user received");

const user=req.body as User;
const updated=this.userService.updateUser(user);

if(updated){
res.status(200).send(`User with id ${user.id} was updated`);

logger.log("User updated");
logger.save("User updated");

}else{
res.status(404).send(`User with id ${user.id} not found`);

logger.log("User not found for update");
}
}

getAllUsers(res: Response){

logger.log("Request to get all users received");

const users = this.userService.getAllUsers();
res.status(200).json(users);

logger.log("All users returned successfully");
}
}
