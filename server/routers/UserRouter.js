
//userRouter

const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();


userRouter.post("/user/signInUser", userController.oneUser);
userRouter.post("/user/addUser", userController.addUser);
userRouter.post("/user/searchUser", userController.searchUser);


module.exports = userRouter;