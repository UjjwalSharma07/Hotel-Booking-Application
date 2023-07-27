const express = require("express");
const Hotel = require("../models/Hotel");

const { createHotel, getHotels, getHotel, deleteHotel, updateHotel, countByCity, countByType, getHotelRooms } = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel)
//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//GET
router.get("/find/:id", getHotel)

//GET ALL
router.get("/", getHotels)

router.get("/coutByCity", countByCity)
router.get("/countByType", countByType)

router.get("/room/:id", getHotelRooms)

module.exports =  router;