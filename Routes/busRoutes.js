const express = require("express");
const { addBus, getBus, updateLocation, getallBus } = require("../controller/busController");
const router = express.Router();


router.route("/addbusroute").post(addBus);
router.route("/getbus/:Id").get(getBus);
router.route("/getallbus").get(getallBus);
router.route("/updatelocation/:Id").put(updateLocation);

module.exports = router
