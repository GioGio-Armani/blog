const articleModel = require("../models/articleModel");
const moment = require("moment");

module.exports = {
  getNewArticle: (req, res) => {
    const error = req.query.error;
    const success = req.query.success;
    res.render("newarticle", { error, success });
  },
  getArticle: async (req, res) => {
    try {
      const article = await articleModel.findById(req.params._id).lean();
      console.log(article);
      article.createdAt = moment(article.createdAt).format(
        "DD/MM/YYYY à HH:mm"
      );
      article.updatedAt = moment(article.updatedAt).format(
        "DD/MM/YYYY à HH:mm"
      );
      // console.log(article);
      res.render("article", { article });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },
  postNewArticle: async (req, res) => {
    if (!req.body.contenu && !req.body.titre && !req.body.pseudo) {
      return res.status(400).redirect("/newarticle?error=Champs vides");
    }
    if (req.body.categorie == undefined) {
      return res.status(400).redirect("/newarticle?error=Categorie invalide");
    }
    const { pseudo, titre, categorie, contenu } = req.body;
    try {
      await articleModel.create({
        pseudo,
        titre,
        categorie,
        contenu,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .redirect(
          "/newarticle?error=pseudo minimum 3 caractères, titre minimum 5 caractères"
        );
    }
    res.redirect("/newarticle?success=Article publié !");
  },

  deletePost: async (req, res) => {
    try {
      await articleModel.findByIdAndDelete(req.params._id);
      res.redirect("/list-articles?success=Article supprimé !");
    } catch (error) {
      console.log(error);
      res.redirect("/list-articles?error=Erreur serveur");
    }
  },

  getUpdate: async (req, res) => {
    try {
      const article = await articleModel.findById(req.params._id).lean();
      res.render("newarticle", { article });
    } catch (error) {
      console.log(error);
      res.redirect("/list-articles?error=Erreur serveur");
    }
  },

  updatePost: async (req, res) => {
    if (!req.body.contenu && !req.body.titre && !req.body.pseudo) {
      return res.status(400).redirect("/newarticle?error=Champs vides");
    }
    if (req.body.categorie == undefined) {
      return res.status(400).redirect("/newarticle?error=Categorie invalide");
    }
    const { pseudo, titre, categorie, contenu } = req.body;
    try {
      await articleModel.findByIdAndUpdate(req.params._id, {
        pseudo,
        titre,
        categorie,
        contenu,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .redirect(
          "/newarticle?error=pseudo minimum 3 caractères, titre minimum 5 caractères"
        );
    }
    res.redirect("/newarticle?success=Article modifié !");
  },
};
