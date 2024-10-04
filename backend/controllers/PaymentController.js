const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  try {
    const {userid, amount, name, cardNo, expiryDate, cvn } = req.body;

    // Create a new payment document
    const payment = new Payment({
      userid,
      amount,
      name,
      cardNo,
      expiryDate,
      cvn,
    });

    // Save to database
    await payment.save();

    // Respond with the created payment
    return res.status(201).json({ message: 'Payment created successfully.', payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPaymentsByUserId = async (req, res) => {
  try {
    const { userid } = req.query; // Get user ID from query parameters
    if (!userid) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch payments by user ID
    const payments = await Payment.find({ userid }); 
    return res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments: ", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createPayment, getPaymentsByUserId };
