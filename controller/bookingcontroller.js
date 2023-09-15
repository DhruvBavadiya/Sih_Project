const express = require("express");
const mongoose = require("mongoose")
const catcherror = require("../Middleware/catcherror");
const Bus = require("../Model/BusModel");
const ErrorHandler = require("../utils/errorHandler");

// For booking tickets so seat status will be change to booked.
exports.BookSeat =catcherror(async(req,res,next)=>{
    const bus = await Bus.findById(req.params.Id);

    if (!bus) {
        return next(new ErrorHandler("bus not found", 404));
    }
    const input = req.body;
    const array = bus.seatNumber;
    // const seat = bus.AvailableSeat;
    for(let i=0;i<input.seats.length;i++){
        array[input.seats[i]-1] = true;
    }
     bus.seatNumber = array;
     bus.AvailableSeat = 20 - bus.seatNumber.filter(x=>x).length;
    await bus.save({validateBeforeSave:false})
    
      res.status(201).json({
        success: true,
        bus,
      });
})
// For canceling or reverting tickets so seat status will be change to empty.

exports.CancelSeat = catcherror(async(req,res,next)=>{
    const bus = await Bus.findById(req.params.Id);
    if (!bus) {
        return next(new ErrorHandler("bus not found", 404));
    }
    const input = req.body;

    const array = bus.seatNumber;
    for(let i=0;i<input.cancelseats.length;i++){
        array[input.cancelseats[i]-1] = false;
    }
     bus.seatNumber = array;
     bus.AvailableSeat = 20-bus.seatNumber.filter(x=>x).length;

    await bus.save({validateBeforeSave:false})
    
      res.status(201).json({
        success: true,
        bus,
      });

})
// For for user to see is seats are booked or empty.

exports.ViewSeat = catcherror(async (req, res, next) => {
    const Id = mongoose.Types.ObjectId(req.params.Id);
  
    const bus = await Bus.findById(Id);
    if (!bus) {
      return next(new ErrorHandler("bus not found", 404));
    }
  
    res.status(201).json({
      success: true,
      AvailableSeat: bus.AvailableSeat,
      SeatArray: bus.seatNumber
    });
  });
  