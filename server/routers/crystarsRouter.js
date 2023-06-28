const crystarsController = require("../controllers/crystars.js");

const crystarsRouter = require("express").Router();

crystarsRouter.get("/user/crystar", crystarsController.crystars);

module.exports = crystarsRouter;