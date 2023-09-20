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
  stops:[{
    type:String,
    required:true
  }],
  arrivalTime:{
    type:Number,
    required: true,

  },
  departureTime:{
    type:Number,
    required: true,
  },
  duration: {
    hours: {
      type: Number,
      required: true,
      default: 0,
    },
    minutes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  numOfSeat: {
    type: Number,
    default: 32, // Default number of seats
  },
  AvailableSeat:{
    default:32,
    type:Number
  },
  seatNumber: [
    {
      type: Boolean,
      default: false, // Default seat availability
    },
  ],
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
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
