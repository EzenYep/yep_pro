const express = require('express');
const passwordController = require('../controllers/passwordController.js');
const passwordRoutes = express.Router();

passwordRoutes.post('/update-password', passwordController.updatePassword);
passwordRoutes.post('/delete-member', passwordController.deleteMember); 
passwordRoutes.post('/get-payment-count', passwordController.getPaymentCount);
passwordRoutes.post("/crystars", passwordController.crystars);

module.exports = passwordRoutes;