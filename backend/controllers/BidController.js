const Bid = require('../models/Bidding');

const addBid = async (req, res) => {
    try {
      const { userid, bidamount, productName } = req.body;
      
      const newBid = new Bid({
        userid,
        bidamount,
        productName,
      });
  
      await newBid.save();
      res.status(201).json({ message: "Bid placed successfully", bid: newBid });
    } catch (error) {
      console.error("Error placing bid:", error);
      res.status(500).json({ error: "Failed to place bid" });
    }
  };

  // Get bids by product name
const getBidsByProductName = async (req, res) => {
    const { productName } = req.params;
    
    try {
      const bids = await Bid.find({ productName });
      
      if (bids.length === 0) {
        return res.status(404).json({ message: "No bids found for this product" });
      }
      
      res.status(200).json(bids);
    } catch (error) {
      console.error("Error fetching bids by product name:", error);
      res.status(500).json({ error: "Failed to fetch bids for this product" });
    }
  };
  

  module.exports = { addBid , getBidsByProductName};