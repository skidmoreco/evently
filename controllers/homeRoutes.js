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

// It looks like this route isn't being used. We should remove it from our code before final submission!
// Use withAuth middleware to prevent access to route
router.get("/user", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);

    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/sign-up/", (req, res) => {
  res.render("sign-up");
});

router.get("/newEvent", (req, res) => {
  res.render("createEvent");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).end();
  });
  res.render("logout");
});

router.get("/allEvents", async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: {
        model: User
      },
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("allEvents", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
