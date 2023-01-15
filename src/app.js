const express = require("express");
const router = require("./route");
const app = express();
const port = 8001;
const path = require("path");
const staticPath = path.join(__dirname, "../public");

require("./database");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => {
  console.log(`listening to port no. ${port} `);
});
