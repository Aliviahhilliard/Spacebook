const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/threads', threadRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
