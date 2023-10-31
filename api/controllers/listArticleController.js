const articleModel = require("../models/articleModel");
const moment = require("moment");

module.exports = {
  get: async (req, res) => {
    const success = req.query.success;
    const error = req.query.error;
    try {
      const articles = await articleModel.find({}).lean();
      articles.map((article) => {
        article.createdAt = moment(article.createdAt).format(
          "DD/MM/YYYY à HH:mm"
        );
        article.updatedAt = moment(article.updatedAt).format(
          "DD/MM/YYYY à HH:mm"
        );
      });
      // console.log(articles);
      res.render("list-articles", { articles, success, error });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },
};
