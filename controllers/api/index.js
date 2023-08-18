const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');
// const signupRoutes = require('./signupRoutes');
const exploreRoutes = require('./exploreRoutes');
const friendRoutes = require('./friendRoutes');

// const openaiExports = require('./openai');

router.use('/users', userRoutes);
router.use('/threads', threadRoutes);
router.use('/comments', commentRoutes);
// router.use('/signup', signupRoutes);
router.use('/explore', exploreRoutes);
router.use('/friends', friendRoutes);

module.exports = router;
