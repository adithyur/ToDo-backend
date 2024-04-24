const mongoose = require('mongoose');

function connectToMongoDB() {
  const uri = "mongodb+srv://kl61altoboy:Y5drAuRWLvWKy53L@todo.xww519t.mongodb.net/?retryWrites=true&w=majority&appName=ToDo";
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
}

module.exports = {
  connectToMongoDB
};