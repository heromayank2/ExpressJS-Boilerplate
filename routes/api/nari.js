const express = require("express");
const router = express.Router();
const Nari = require("../../models/Nari");
const Article = require("../../models/Article");
const passport = require("passport");
var auth = require("../auth");

//
// Registering New User 

router.post("/", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new Nari(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//

router.post("/login", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() }).send("You are in");
      }

      return status(400).info;
    }
  )(req, res, next);
});

//

router.get("/profile", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Nari.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    } else {
      if (user.articles) {
        var articles = [];
        user.articles.forEach(article_id => {
          Article.findById({ _id: article_id }).then(article => {
            articles.push(article);
          });
        });
        return res.json({ user,articles});
      }
      return res.json({ user });
    }
  });
});


module.exports = router;
