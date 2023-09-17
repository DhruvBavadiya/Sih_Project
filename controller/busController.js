const express = require("express");
const catcherror = require("../Middleware/catcherror");
const Bus = require("../Model/BusModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/ApiFeature")
// Adding Bus API.
exports.addBus = catcherror(async (req, res, next) => {
  const Res = await Bus.create(req.body);
  res.status(201).json({
    success: true,
    Res,
  });
});
// By id of bus we can get bus latest updated location. 
exports.getBus = catcherror(async (req, res, next) => {
//   const busId = req.body.busId;
//   const query = { busID: busId };
//   console.log(query);

  const bus = await Bus.findById(req.params.Id);
  if (!bus) {
    return next(new ErrorHandler("bus not found", 404));
  }
  res.status(201).json({
    success: true,
    bus,
  });
});

exports.getallBus = catcherror(async (req, res, next) => {
  const resultPerPage = 4
  const countProducts = await Bus.countDocuments()
  const apifeature = new ApiFeature(Bus.find(), req.query)
      .search()
      .filter()
      .Pagination(resultPerPage);
  const bus = await apifeature.query;
  res.status(201).json({
      success: true,
      bus
  })
});


// exports.search =catcherror((req,res,next)=>{
//     const query = req.query;

//     let filterBus = 

//     console.log(query)
// })
//  For update location coordinates which are fetch from hardware.
exports.updateLocation = catcherror(async (req, res, next) => {
 
  const bus = await Bus.findById(req.params.Id);
  if (!bus) {
    return next(new ErrorHandler("bus not found", 404));
  }
  //   bus.longitude = await req.body.longitude;
  //   bus.latitude = await req.body.latitude;

  newbus = await Bus.findByIdAndUpdate(req.params.Id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    newbus,
  });
});
