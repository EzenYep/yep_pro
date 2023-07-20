
//userRouter

const userController = require("../controllers/UserController.js");
const passport = require("passport");

const userRouter = require("express").Router();
// const kakaoLoginController = require("../controllers/KakaoLoginController.js");


userRouter.post("/user/signInUser", userController.oneUser);

userRouter.post("/user/addUser", userController.addUser);

userRouter.post("/user/searchUser", userController.searchUser);

userRouter.post("/user/sendEmail", userController.sendEmail);

userRouter.post("/user/findpwresult", userController.findpwresult);

userRouter.post("/user/updatePassword", userController.updatePassword);

userRouter.post("/user/signInUser", userController.oneUser);


module.exports = userRouter;