const express = require('express');
const { createPayment, getPaymentsByUserId } = require('../controllers/PaymentController'); // Adjust the path as necessary

const router = express.Router();

// POST route to create a payment
router.post('/payments', createPayment);

router.get('/payments', getPaymentsByUserId);

module.exports = router;
