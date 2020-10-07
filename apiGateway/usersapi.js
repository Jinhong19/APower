const express = require("express");
const app = express();
const PORT = 3002;
const mongoose = require("mongoose");

const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { userNewUrlParser: true })
  .then(() => console.log("Mongo Connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.get("/login", (req, res) => res.send("Login"));

app.get("/register", (req, res) => res.send("Register"));

app.listen(PORT, () => {
  console.log("testapi on PORT " + PORT);
});
