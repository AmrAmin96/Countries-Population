const router = require("express").Router();
const {
  getAllCities,
  getAllCountries,
  getCountryWithPopulation,
} = require("../controllers/app.controller");

// get all Countries
router.get("/getAllCountries", getAllCountries);

// get all Cities
router.get("/getAllCities", getAllCities);

// get Country with population
router.post("/getCountryWithPopulation", getCountryWithPopulation);

module.exports = router;
