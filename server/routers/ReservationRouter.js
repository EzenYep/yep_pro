const express = require('express');
const reservationController = require('../controllers/ReservationController');
const ReservationRouter = express.Router();

ReservationRouter.post("/getTheaterId",reservationController.theaterID)
ReservationRouter.post('/getTitleID',reservationController.titleID)
ReservationRouter.post('/getScreenTime',reservationController.screenTime)
ReservationRouter.post('/getSeat',reservationController.seatser)
ReservationRouter.post("/getReserved",reservationController.ReservedSeat)
ReservationRouter.post("/makeReservation",reservationController.makeReservation)

module.exports = ReservationRouter; 


