"use strict";
// Dependencies
const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();

// modules

// @Description: Get all planets
// @Route: GET /planets
router.get("/", async (req, res) => {
  // retrieve all planets
  const planets = await getAllPlanets();

  //
  if (!planets) {
    // Return response to client
    return res.status(400).json({
      success: false,
      message: "Error while retrieving planets",
    });
  }

  // Return response to client
  return res.status(200).json({
    success: true,
    count: planets.length,
    data: planets,
  });
});

// private functions
const getAllPlanets = async () => {
  const planets = [];
  let url = "https://swapi.dev/api/planets";
  let stop = false;
  try {
    // loop the response until there is no more next pages
    while (url && !stop) {
      // make api call
      const { data } = await axios.get(url);

      // validate next page
      if (!data.next) {
        stop = true;
      }

      // update endpoint
      url = data.next;

      // loop through results and add items to people array
      data.results.map(async (item) => {
        item.residents = await getResidents(item);
        planets.push(item);
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return false;
  }

  return planets;
};

const getResidents = (planet) => {
  const residents = [];
  planet.residents.map(async (item) => {
    const { data } = await axios.get(item);
    residents.push(data.name);
  });
  return residents;
};

module.exports = router;
