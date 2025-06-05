const express = require("express");
const router = express.Router();
const { createBooking, getBookingsByCourt, getBookingsByUser, cancelBooking, getBookingsByClub } = require("../controllers/bookingsController");

router.post("/", createBooking);
router.get("/user/:userId", getBookingsByUser);
router.get("/court/:courtId", getBookingsByCourt);
router.get("/courts/:clubId", getBookingsByClub);
router.delete("/cancel/:id", cancelBooking);

module.exports = router;
