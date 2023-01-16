const mongoose = require("mongoose");
require('dotenv').config()
console.log(process.env.MONGODB_URI)
const link='mongodb://ruchi:ruchika@ac-wgwphhi-shard-00-00.p47ebfa.mongodb.net:27017,ac-wgwphhi-shard-00-01.p47ebfa.mongodb.net:27017,ac-wgwphhi-shard-00-02.p47ebfa.mongodb.net:27017/?ssl=true&replicaSet=atlas-y0sojy-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.set("strictQuery", "false");
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit();
});
