const crystarspwsController = require("../controllers/crystarspwsController.js");

const crystarspwsRouter = require("express").Router();



crystarspwsRouter.get("/user/crystarspws", crystarspwsController.crystarspws);

module.exports = crystarspwsRouter;