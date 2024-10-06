const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  bidId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
  userid: {
        type: String,
        required: true
    },
  bidamount: {
    type: Number, 
  },
  productName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["requested", "accepted", "rejected"],
    default: "requested",
  },
});

const Bid = mongoose.model("Bid", BidSchema);
module.exports = Bid;
