const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    const users = userData.map((event) => event.get({ plain: true }));
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// //////////===================================

// Use withAuth middleware to prevent access to route
router.get("/user", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findOne(req.session.user_id, {
    //   attributes: { exclude: ["password"] },
    //   include: [{ model: Event }],
    // });
    console.log(req.session.user_id);

    // const user = userData.map((event) => event.get({ plain: true }));
    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/sign-up/", (req, res) => {
  res.render("sign-up");
});

router.get("/events/:date", (req, res) => {
  res.render("allEventsOnDate");
});

router.get("/newEvent", (req, res) => {
  res.render("createEvent");
});

router.get("/logout", (req, res) => {
  res.render("logout");
});

module.exports = router;
