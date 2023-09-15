const express = require("express");
const { BookSeat, CancelSeat, ViewSeat } = require("../controller/bookingcontroller");
const router = express.Router();

router.route("/bookseat/:Id").put(BookSeat);
router.route("/cancelseat/:Id").put(CancelSeat);
router.route("/viewseat/:Id").get(ViewSeat);

module.exports = router