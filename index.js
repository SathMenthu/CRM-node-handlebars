const express = require("express");
const hbs = require("express-handlebars");
const { clientRouter } = require("./routers/client");
const { homeRouter } = require("./routers/home");
const { db } = require("./utils/db");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.engine(
  ".hbs",
  hbs({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.use("/", homeRouter);
app.use("/client", homeRouter);
app.get("/test", (req, res) => {
  res.json(JSON.stringify(db.delete("0c26b2a2-0956-4fa3-97d3-1e4b8674acde")));
});

app.listen(3000, "localhost", () => {
  console.log("Listening on http://localhost:3000/");
});
