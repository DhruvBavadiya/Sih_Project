const mongoose = require("mongoose");

const BusModel = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  busType: {
    type: String,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
    default: Date.now,
  },
  numOfSeat: {
    type: Number,
    default: 20, // Default number of seats
  },
  AvailableSeat:{
    default:20,
    type:Number
  },
  seatNumber: [
    {
      type: Boolean,
      default: false, // Default seat availability
    },
  ],
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});

// Middleware to ensure seatNumber array size matches numOfSeat
BusModel.pre("save", function (next) {
  if (this.seatNumber.length !== this.numOfSeat) {
    // Resize the seatNumber array to match numOfSeat
    this.seatNumber = new Array(this.numOfSeat).fill(false);
  }
  next();
});

module.exports = mongoose.model("BusModel", BusModel);
