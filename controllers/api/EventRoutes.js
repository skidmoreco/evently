const router = require("express").Router();
const { Event, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(allEvents);
    const events = allEvents.map((everyEvent) =>
      everyEvent.get({ plain: true })
    );

    // res.status(200).json({ event: events });

    res.render("allEvents", {
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------
// reouter is /api/events
// router.get('/id/:id')

// router /api/events/events/:date
router.get("/:date", async (req, res) => {
  // console.log('cheese')
  // grab all the events where the date equals what we're clicking
  // loan handlebars file that displays these specific events on this date
  // using sequelize here to display
  // need to be using res.render for handlebars
  try {
    const eventInfo = await Event.findAll({
      // where: {event_date: req.params.date},
      attributes: [
        "id",
        "name",
        "description",
        "location",
        "event_date",
        "event_time",
        "expected_attendance",
      ],
      include: {
        model: User,
      },
    });

    const events = eventInfo.map((eventsOnDate) =>
      eventsOnDate.get({ plain: true })
    );

    console.log(events); // dig into this object to find the USER data

    res.render("Event", {
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------

router.get(
  "/:id", async (req, res) => {
    try {
      const eventSpecific = await Event.findOne({
        where: { id: req.params.id },
        attributes: [
          "id",
          "name",
          "description",
          "location",
          "event_date",
          "event_time",
          "expected_attendance",
        ],
        include: [
          {
            model: User,
            attributes: ["id", "username", "email", "password"],
          },
        ],
      });

      const targetEvent = eventSpecific.map((event) =>
        event.get({ plain: true })
      );
      res.render("Event", {
        targetEvent,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/createEvent", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    console.log(req.body);
    console.log(req.session.user_id);
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newEvent);

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
