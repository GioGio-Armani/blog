const mongoose = require("mongoose");

// connexion à la base de données

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Mongo connecté"));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
