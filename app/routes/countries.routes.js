const router = require("express").Router();
const {
  getAllCitiesWithPopulation,
  getAllCountriesWithPopulation,
  getCountryWithPopulation,
  getAllCountries,
  syncCountries,
} = require("../controllers/app.controller");

// get all Countries
router.get("/getAllCountriesWithPopulation", getAllCountriesWithPopulation);

// get all Cities
router.get("/getAllCitiesWithPopulation", getAllCitiesWithPopulation);

// get Country with population
router.post("/getCountryWithPopulation", getCountryWithPopulation);

// get all countries with pagination
router.get("/getAllCountries", getAllCountries);

// sync countries
router.post("/syncCountries", syncCountries);

module.exports = router;
