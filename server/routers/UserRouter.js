const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();


userRouter.post("/user/addUser", userController.addUser);


module.exports = userRouter;
