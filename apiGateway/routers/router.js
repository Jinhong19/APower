const express = require("express");
// var Express = require('express')
const router = express.Router();
const axios = require("axios");
const registry = require("./registry.json");
const fs = require("fs");


// .all takes all kinds of request POST, GET ...
router.all("/:apiName/:path", async function(req, res) {
  console.log(req.body)
  console.log("called " + req.params.apiName);
  //check if the api exist in registry

  if (registry.services[req.params.apiName]) {
    await axios({
      method: req.method,
      url: registry.services[req.params.apiName].url + req.params.path,
      headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.send(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } else {
    res.send("API name doesn't exist");
  }
});

router.all("/:apiName/:path/:path2", (req, res) => {
  console.log("called " + req.params.apiName);
  //check if the api exist in registry
  if (registry.services[req.params.apiName]) {
    url = registry.services[req.params.apiName].url + req.params.path + "/" + req.params.path2;
    console.log(url);
    axios({
      method: req.method,
      url,
      headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send("API name doesn't exist");
  }
});

router.all("/:apiName/:path/:path2/:path3/:path4/:path5", (req, res) => {
  console.log("called " + req.params.apiName);
  //check if the api exist in registry
  if (registry.services[req.params.apiName]) {
    url = registry.services[req.params.apiName].url + req.params.path + "/" + req.params.path2;
    console.log(url);
    axios({
      method: req.method,
      url,
      headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send("API name doesn't exist");
  }
});

//Auto register for new api
// following code to use above post request:
// curl -X POST -d '{"apiName": "test","host": "http://localhost","port": 3001,"url": "http://localhost:3001/"}'
// -H 'Content-Type: application/json' http://localhost:3000/register
router.post("/register", (req, res) => {
  let registrationInfo = req.body;
  registry.services[registrationInfo.apiName] = { ...registrationInfo };

  fs.writeFile("./routers/registry.json", JSON.stringify(registry), (error) => {
    if (error) {
      res.send("Failed to register the new API! \n" + error);
    } else {
      res.send("Successfully register the new API" + registrationInfo.apiName);
    }
  });
});

module.exports = router;
