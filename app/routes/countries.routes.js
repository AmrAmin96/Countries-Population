const router = require("express").Router();
const {
  getAllCities,
  getAllCountries,
} = require("../controllers/app.controller");

// get all Countries
router.get("/getAllCountries", getAllCountries);

// get all Cities
router.get("/getAllCities", getAllCities);

module.exports = router;
