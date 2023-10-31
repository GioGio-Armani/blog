const mongoose = require("mongoose");

const articleModel = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    titre: {
      type: String,
      minLength: 5,
      maxLength: 55,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
      enum: ["article", "comparaison", "essai"],
    },
    contenu: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("article", articleModel);
