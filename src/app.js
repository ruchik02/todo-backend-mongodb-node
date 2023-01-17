const express = require("express");
const PORT=8000;
const dotenv=require('dotenv');
dotenv.config({ path: "./config.env" });
const router = require("./route");
const app = express();
const path = require("path");
const staticPath = path.join(__dirname, "../public");
require("./database");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(PORT, () => {
  console.log(`listening to port no. ${PORT} `);
});
