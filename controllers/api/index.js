const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');
const exploreRoutes = require('./exploreRoutes');
const friendRoutes = require('./friendRoutes');

// const openaiExports = require('./openai');

// router.use('/openai', openaiExports);
router.use('/users', userRoutes);
router.use('/threads', threadRoutes);
router.use('/comments', commentRoutes);
router.use('/explore', exploreRoutes);
router.use('/friends', friendRoutes);

module.exports = router;
