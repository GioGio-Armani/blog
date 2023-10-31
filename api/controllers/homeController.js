const articleModel = require("../models/articleModel");

module.exports = {
  get: async (req, res) => {
    const Articles = await articleModel.find({}).lean().sort({ createdAt: -1 });
    const lastArticle = Articles[0];
    res.render("home", { lastArticle });
  },
};
