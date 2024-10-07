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

  const getBidsByUserid = async (req, res) => {
    const { userid } = req.params;
    
    try {
      const bids = await Bid.find({ userid });
      
      if (bids.length === 0) {
        return res.status(404).json({ message: "No bids found for this user" });
      }
      
      res.status(200).json(bids);
    } catch (error) {
      console.error("Error fetching bids by product name:", error);
      res.status(500).json({ error: "Failed to fetch bids for this user" });
    }
  };

  const getHighestBid = async (req, res) => {
    try {
        // Get product name from request parameters or query
        const { productName } = req.params; // or req.query if you're sending it as a query param

        // Find the highest bid for the specified product
        const highestBid = await Bid.findOne({ productName }).sort({ bidamount: -1 }).exec();

        if (highestBid) {
            return res.status(200).json({ highestBidAmount: highestBid.bidamount });
        } else {
            return res.status(404).json({ message: 'No bids found for this product.' });
        }
    } catch (error) {
        console.error("Error fetching highest bid:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Example route in your backend API
const bidCount = async (req, res) => {
  try {
    const { productName } = req.params;
    // Assuming you have a Bid model and bids are linked to products by product name
    const bidCount = await Bid.countDocuments({ productName: productName });
    
    res.json({ bidCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to get bid count" });
  }
};

const updateBid = async (req, res) => {
  const { bidId } = req.params;
  const { newState } = req.body; // The new state (accepted/rejected)

  try {
    const updatedBid = await Bid.findByIdAndUpdate(
      bidId,
      { state: newState }, // Update the state field
      { new: true } // Return the updated document
    );

    if (!updatedBid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    return res.status(200).json(updatedBid);
  } catch (error) {
    console.error('Error updating bid state: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  

  module.exports = { addBid , getBidsByProductName, getHighestBid, bidCount, getBidsByUserid, updateBid};