const express = require("express");
const connection = require("../config/dbconnection");
const request = require("request");
let allCities = [];
let allCountries = [];
let countries = [];
let countryPopulations = [];
let cities = [];
let cityPopulations = [];
let getcountryboolean = false;
let getcityboolean = false;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function newCountry() {
  return {
    country: null,
    code: null,
    iso3: null,
  };
}

function newPopulation() {
  return {
    value: null,
    year: null,
    country: null,
    city: null,
  };
}

function newCity() {
  return {
    city: null,
    country: null,
  };
}

//get all countries and their population and throw them to database
const getAllCountries = async (req, res) => {
  if (getcountryboolean == true) {
    return res.status(400).json({
      message: "Already added to database",
      success: false,
    });
  }
  request(
    "https://countriesnow.space/api/v0.1/countries/population",
    { json: true },
    (err, response, body) => {
      if (err) {
        return res.status(400).json({
          message: "Error",
          error: err,
          success: false,
        });
      }

      allCountries = body.data;
      allCountries.forEach((element) => {
        let countryarray = [];
        countryarray.push(element.country, element.code, element.iso3);
        countries.push(countryarray);
        let allCountryPopulations = element.populationCounts;
        allCountryPopulations.forEach((population) => {
          let populationarray = [];
          populationarray.push(
            population.value,
            population.year,
            element.country
          );
          countryPopulations.push(populationarray);
        });
      });
      var countrysql = "INSERT INTO countries (country, code, iso3) VALUES ?";
      var populationsql =
        "INSERT INTO population_counts (value, year, country) VALUES ?";

      connection.query(countrysql, [countries], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });

      connection.query(
        populationsql,
        [countryPopulations],
        function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        }
      );
      getcountryboolean = true;
      res.status(200).send({
        error: false,
        msg: "all countries and population 1961 - 2018",
        result: allCountries,
      });
    }
  );
};

// get all cities and add them to database
const getAllCities = async (req, res) => {
  if (getcityboolean == true) {
    return res.status(400).json({
      message: "Already added to database",
      success: false,
    });
  }
  request(
    "https://countriesnow.space/api/v0.1/countries/population/cities",
    { json: true },
    (err, response, body) => {
      if (err) {
        return res.status(400).json({
          message: "Error",
          error: err,
          success: false,
        });
      }

      allCities = body.data;
      allCities.forEach((element) => {
        let cityarray = [];
        cityarray.push(element.city, element.country);
        cities.push(cityarray);
        let allCityPopulations = element.populationCounts;
        allCityPopulations.forEach((population) => {
          let populationarray = [];
          populationarray.push(
            population.value,
            population.year,
            population.sex,
            population.reliabilty,
            element.city,
            element.country
          );
          cityPopulations.push(populationarray);
        });
      });

      var citysql = "INSERT INTO cities (city, country) VALUES ?";
      var populationsql =
        "INSERT INTO population_counts (value, year, sex, reliabilty, city, country) VALUES ?";

      connection.query(citysql, [cities], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });

      connection.query(
        populationsql,
        [cityPopulations],
        function (err, result) {
          if (err) {
            console.log(err.sqlMessage);
            return;
          }
          console.log("Number of records inserted: " + result.affectedRows);
        }
      );
      getcityboolean = true;
      res.status(200).send({
        error: false,
        msg: "all cities with population",
        data: allCities,
      });
    }
  );
};

// get specific country with population
const getCountryWithPopulation = async (req, res) => {
  const country = req.body.country;
  connection.query(
    `SELECT c.country , c.code, c.iso3, p.year, p.value
    from countries c 
    LEFT JOIN population_counts p
          ON c.country = p.country
    WHERE c.country = 
        '` +
      country +
      `' AND p.sex IS NULL`,
    (err, result) => {
      if (err) {
        res.status(200).json({
          message: "Error",
          error: err,
          success: false,
        });
      }
      let populationArray = [];
      result.forEach((element) => {
        let populationObject = {
          year: null,
          value: null,
        };
        populationObject.year = element.year;
        populationObject.value = element.value;
        populationArray.push(populationObject);
      });
      let finalObject = {
        country: result[0].country,
        code: result[0].code,
        iso3: result[0].iso3,
        populationCounts: populationArray,
      };
      res.status(200).send({
        error: false,
        msg: country + " with population",
        data: finalObject,
      });
    }
  );
};

module.exports = {
  getAllCountries,
  getAllCities,
  getCountryWithPopulation,
};
