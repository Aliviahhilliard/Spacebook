const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        // Fetch random posts along with their associated users
        const randomPosts = await Post.findAll({
            order: sequelize.random(), // Use sequelize.random() to get random order
            include: [{ model: User }],
        });

        // Pass the random posts data to the explore page
        res.render('explore', { layout: 'main', randomPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;