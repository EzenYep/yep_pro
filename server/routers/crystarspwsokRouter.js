const crystarspwsokController = require("../controllers/crystarspwsokController.js");

const crystarspwsokRouter = require("express").Router();



crystarspwsokRouter.get("/user/crystarspwsok", crystarspwsokController.crystarspwsok);

module.exports = crystarspwsokRouter;