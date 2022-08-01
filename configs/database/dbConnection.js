const mongoose = require('mongoose');
require('../setConfig')

mongoose.connect(process.env.MONGO_URL + process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
console.log(process.env.DATABASE);
console.log(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = mongoose;