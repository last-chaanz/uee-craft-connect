const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
  userid: {
        type: String,
        required: true
    },
  amount: {
    type: Number, 
  },
  dateOfPurchase: {
    type: Date,
    default: Date.now, 
  },
  name: {
    type: String,
    required: true,
  },
  cardNo: {
    type: String,
    required: true, 
  },
  expiryDate: {
    type: String, 
    required: true,
  },
  cvn: {
    type: String, 
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
