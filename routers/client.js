const express = require("express");
const { db } = require("../utils/db");

const clientRouter = express.Router();

clientRouter
  .get("/", (req, res) => {
    res.render("client/list-all", {
      clients: db.getAll(),
    });
  })

  .get("/:id", (req, res) => {
    res.render("client/one", {
      client: db.getOne(req.params.id),
    });
  })

  .post("/", (req, res) => {
    const id = db.create(req.body);

    res.render("client/added", {
      id,
      name: req.body.name,
    });
  })

  .delete("/:id", (req, res) => {
    db.delete(req.params.id);
    res.render("client/deleted");
  })

  .get("/form/add", (req, res) => {
    res.render("client/forms/add");
  })

  .get("/form/edit/:id", (req, res) => {
    res.render("client/forms/edit", {
      client: db.getOne(req.params.id),
    });
  })

  .put("/:id", (req, res) => {
    console.log("xd");
    db.update(req.params.id, req.body);
    res.render("client/modified", {
      id: req.params.id,
      name: req.body.name,
    });
  });

module.exports = {
  clientRouter,
};
