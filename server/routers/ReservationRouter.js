const express = require('express');
const reservationController = require('../controllers/ReservationControllers');
const ReservationRouter = express.Router();

ReservationRouter.post("/getTheaterId",reservationController.theaterID)
ReservationRouter.post('/getTitleID',reservationController.titleID)
ReservationRouter.post('/getScreenTime',reservationController.screenTime)
ReservationRouter.post('/getSeat',reservationController.seatser)
ReservationRouter.post("/getReserved",reservationController.ReservedSeat)
// reservationRouter.get('/getUser',reservationController.getUser)

module.exports = ReservationRouter; 