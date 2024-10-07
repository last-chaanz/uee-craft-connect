const express = require('express');
const { addBid , getBidsByProductName, getHighestBid, bidCount , getBidsByUserid, updateBid} = require('../controllers/BidController'); 

const router = express.Router();

// POST route to create a payment
router.post('/bids', addBid);

router.get("/getBidsByProductName/:productName", getBidsByProductName);
router.get("/getBidsByuserid/:userid", getBidsByUserid);

router.get('/highest-bid/:productName', getHighestBid);

router.get("/bid-count/:productName",bidCount);

// Update a Product
router.put("/updateBidState/:bidId",updateBid);


module.exports = router;
