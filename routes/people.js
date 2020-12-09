"use strict";
// Dependencies
const express = require("express");
const axios = require("axios");
const router = express.Router();

// modules

// @Description: Get all people
// @Route: GET /people
router.get("/:sortBy?", async (req, res) => {
  let sortby = req.params.sortBy;
  // retrieve all people
  const people = await getAllPeople();

  if (!people) {
    // Return response to client
    return res.status(400).json({
      success: false,
      message: "Error while retrieving people",
    });
  }

  // sort array
  if (sortby) {
    sortPeople(sortby, people);
  }

  // Return response to client
  return res.status(200).json({
    success: true,
    count: people.length,
    data: people,
  });
});

// private functions
const getAllPeople = async () => {
  const people = [];
  let url = "https://swapi.dev/api/people";
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
      data.results.map((item) => {
        people.push(item);
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return false;
  }

  return people;
};

const sortPeople = (sortby, array) => {
  if (sortby === "name") {
    array.sort((a, b) => {
      return a[sortby] > b[sortby] ? 1 : -1;
    });
  } else {
    array.sort((a, b) => {
      return a[sortby] - b[sortby];
    });
  }
};

module.exports = router;
