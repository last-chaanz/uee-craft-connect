const express = require('express');
const { addBid , getBidsByProductName } = require('../controllers/BidController'); 

const router = express.Router();

// POST route to create a payment
router.post('/bids', addBid);

router.get("/getBidsByProductName/:productName", getBidsByProductName);


module.exports = router;
