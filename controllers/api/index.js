const router = require('express').Router();
const eventRoutes = require('./api/eventRoutes');


router.use('/event', eventRoutes);


module.exports = router;
