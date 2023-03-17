const router = require('express').Router();
const userRoute = require('./userRoutes');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', userRoute);
router.use('/thoughts', thoughtsRoute);

module.exports = router;