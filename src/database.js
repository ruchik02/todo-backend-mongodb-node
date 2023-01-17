const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set("strictQuery", "false");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit();
});
