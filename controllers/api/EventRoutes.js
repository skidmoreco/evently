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

    res.status(200).json({ event: events });

    res.render("allEvents", {
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------
router.get("/events/:date", withAuth, async (req, res) => {
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
    });

    const events = eventInfo.map((eventsOnDate) =>
      eventsOnDate.get({ plain: true })
    );
    res.render("allEventsOnDate", {
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// --------------------------------------------------------------

router.get("/:id", withAuth, async (req, res) => {
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
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteEvent = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deleteEvent) {
      res.status(404).json({
        message:
          "There is no event found with this particular id! Please try again.",
      });
      return;
    }

    res.status(200).json(deleteEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
