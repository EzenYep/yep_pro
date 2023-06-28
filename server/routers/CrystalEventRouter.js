const CrystalEventController = require("../controllers/CrystalEventController.js");

const CrystalEventRouter = require("express").Router();



CrystalEventRouter.get("/user/CrystalEvent", CrystalEventController.CrystalEvent);

module.exports = CrystalEventRouter;