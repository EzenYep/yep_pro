const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();


userRouter.post("/user/signInUser", userController.oneUser);

userRouter.post("/user/addUser", userController.addUser);

userRouter.get("/crystarspwsok", userController.crystarspwsok);

userRouter.get("/crystarspws", userController.crystarspws);

userRouter.post("/crystars", userController.crystars);

userRouter.get("/CrystalEvent", userController.CrystalEvent);

userRouter.post("/user/searchUser", userController.searchUser);

userRouter.post("/user/sendEmail", userController.sendEmail);

userRouter.post("/user/findpwresult", userController.findpwresult);

userRouter.post("/user/updatePassword", userController.updatePassword);

userRouter.post("/user/signInUser", userController.oneUser);


module.exports = userRouter;
