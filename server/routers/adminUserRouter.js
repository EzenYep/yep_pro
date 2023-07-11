const express = require('express');
const adminUserRouter = express.Router();

const adminUserController = require("../controllers/adminUserController.js");

adminUserRouter.get("/getUserList", adminUserController.getUserList);
adminUserRouter.post('/manager_user', adminUserController.deleteUsers);


module.exports = adminUserRouter;