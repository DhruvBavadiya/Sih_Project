const express = require("express");
const mongoose = require("mongoose");
const catcherror = require("../Middleware/catcherror");
const Bus = require("../Model/BusModel");
const Pnr = require("../Model/pnrModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/ApiFeature");

// For booking tickets so seat status will be change to booked.
exports.BookSeat = catcherror(async (req, res, next) => {
  const bus = await Bus.findById(req.params.Id);

  if (!bus) {
    return next(new ErrorHandler("bus not found", 404));
  }
  // console.log(bus)
  const input = req.body.seats;
  const array = bus.seatNumber;
  const booked = false;
  // const seat = bus.AvailableSeat;
  for (let i = 0; i < input.length; i++) {
    array[input[i] - 1] = true;
  }
  bus.seatNumber = array;
  bus.AvailableSeat = 32 - bus.seatNumber.filter((x) => x).length;
  const success = await bus.save({ validateBeforeSave: false });
  // console.log(success)
  // res.status(201).json({
  //   success: true,
  //   booked:true,
  // });

  console.log(bus.from);
  if (success) {
    console.log(req.body.user);
    data = {
      pnrNumber: 1256780,
      user: {
        mobileNumber: req.body.user.mobileNumber,
        email: req.body.user.email,
      },
      bus: {
        id: req.params.Id,
        from: bus.from,
        to: bus.to,
        arrivalTime: bus.arrivalTime,
        seatNumber: input,
      },
    };
    const Res = await Pnr.create(data);

    res.status(201).json({
      success: true,
      booked: true,
      Res,
    });
  }
});
// For canceling or reverting tickets so seat status will be change to empty.

exports.CancelSeat = catcherror(async (req, res, next) => {
  const bus = await Bus.findById(req.params.Id);
  if (!bus) {
    return next(new ErrorHandler("bus not found", 404));
  }
  const input = req.body;

  const array = bus.seatNumber;
  for (let i = 0; i < input.cancelseats.length; i++) {
    array[input.cancelseats[i] - 1] = false;
  }
  bus.seatNumber = array;
  bus.AvailableSeat = 32 - bus.seatNumber.filter((x) => x).length;

  await bus.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    bus,
  });
});
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
    SeatArray: bus.seatNumber,
  });
});

exports.generatePNR = catcherror(async (req, res, next) => {
  const Res = await Pnr.create(req.body);
  res.status(201).json({
    success: true,
    Res,
  });
});

// Find pnrNumber:

exports.findPnr = catcherror(async (req, res, next) => {
  const apifeature = new ApiFeature(Pnr.find(), req.query).search().filter();

  const pnr = await apifeature.query;
  res.status(201).json({
    success: true,
    pnr,
  });
});

exports.sendSMS = catcherror(async (req, res, next) => {

  const pnr = await Pnr.findById(req.params.Id)

  const accountSid = "AC34d85a7dde8484535182a0936a8ca5d6";
  const authToken = "5cfbc021c8b469127f51c9ce03f7d849";
  const client = require("twilio")(accountSid, authToken);
  const body = `Hello ${pnr.user.mobileNumber} this is your pnr number:${pnr.pnrNumber} ,your bus is from ${pnr.bus.from} to ${pnr.bus.to} and seatNumber are ${pnr.bus.seatNumber}`
 const responce = client.messages
    .create({
      body: body,
      from: "+14109275816",
      to: "+918238912860",
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(`Error sending message: ${error.message}`));
    
    if(responce){
      res.status(201).json({
        success:true
      })
    }
});
