const contactModel = require("../models/contactModel");

module.exports = {
  get: (req, res) => {
    const error = req.query.error;
    res.render("contact", { error });
  },

  post: async (req, res) => {
    if (!req.body.message) {
      return res.status(400).redirect("/contact?error=Message manquant");
    }
    await contactModel.create({
      email: req.body.mail,
      name: req.body.name,
      message: req.body.message,
    });
    console.log(req.body);
    res.redirect("/contact");
  },
};
