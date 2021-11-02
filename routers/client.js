const express = require("express");

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  res.render("test.hbs");
});

module.exports = {
  clientRouter,
};
