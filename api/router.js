const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const contactController = require("./controllers/contactController");
const articleController = require("./controllers/articleController");
const listArticleController = require("./controllers/listArticleController");

router.route("/").get(homeController.get);

// contact
router
  .route("/contact")
  .get(contactController.get)
  .post(contactController.post);

// articles
router
  .route("/newarticle")
  .get(articleController.getNewArticle)
  .post(articleController.postNewArticle);
router.route("/article/:_id").get(articleController.getArticle);
router.route("/delete-article/:_id").post(articleController.deletePost);
router.route("/update-article/:_id").get(articleController.getUpdate);
router.route("/update-article/:_id").post(articleController.updatePost);

// list articles
router.route("/list-articles").get(listArticleController.get);

module.exports = router;
