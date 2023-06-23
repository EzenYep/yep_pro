const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();




userRouter.get('/tokenCheck', userController.check)

userRouter.get('/user/logout', userController.logOut);

userRouter.post("/user/addUser", userController.addUser);

userRouter.post("/user/SignInUser",userController.oneUser);

module.exports = userRouter;
