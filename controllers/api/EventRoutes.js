const router = require('express').Router();
<<<<<<< HEAD
const { Event, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('../homeRoutes');

router.get('/', withAuth, async (req, res) => {
  try {
    const allEvents = await Event.findall({
      attributes: ['id', 'name', 'description', 'location', 'event_date', 'event_time', 'event_date', 'expected_attendance'],
      include: [{
        model: User,
        attributes: ['id', 'username', 'email', 'password']
      }],
    });
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const eventSpecific = await Event.findOne({
      where: {id: req.params.id},
      attributes: ['id','name', 'description', 'location', 'event_date', 'event_time', 'expected_attendance'],
      include: [{
        model: User,
        attributes: ['id', 'username', 'email', 'password']
      }],
    });
    res.status(200).json(eventSpecific);
  } catch (err) {
    res.status(500).json(err);
  }
});
=======
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');
>>>>>>> main


router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
<<<<<<< HEAD
      event_name: req.body.event_name
    })
    res.status(200).json(newEvent);
  } catch (err) {
    res.status(500).json(err)
=======
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(500).json(err);
>>>>>>> main
  }
})

<<<<<<< HEAD
router.put('/:id', async (req, res) => {
  try {
    const updateEvent = await Event.update(req.body, {
      where: {id: req.params.id}
    });
    if (!updateEvent) {
      res.status(400).json({message: 'Event does not exist!'})
    }
    res.status(200).json(updateEvent);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteEvent = await Event.destroy({
      where: {id: req.params.id}
    });
    if(!deleteEvent) {
      res.status(400).json({message: 'Event you are trying to delete does not exist!'})
    }
    res.status(200).json(deleteEvent)
  } catch (err) {
    res.status(500).json(err)
  }
});
=======
router.post('/:id', withAuth, async (req, res) => {
  try {
    const deleteEvent = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deleteEvent) {
      res.status(404).json({ message: 'There is no event found with this particular id! Please try again.' });
      return;
    }

    res.status(200).json(deleteEvent);
  } catch (err) {
    res.status(500).json(err);
  }
})
>>>>>>> main

module.exports = router;

