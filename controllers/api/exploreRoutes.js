const router = require('express').Router();
const { Thread, User } = require('../../models');

// router.get('/', async (req, res) => {
//     try {
//         // Fetch random posts along with their associated users
//         const randomPosts = await Thread.findAll({
//             order: sequelize.random(), // Use sequelize.random() to get random order
//             include: [{ model: User, Thread }],
//         });

//         // Pass the random posts data to the explore page
//         res.render('explore', { layout: 'main', randomPosts });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
router.get('/', async (req, res) => {
    try {
        const threadData = await Thread.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const threads = threadData.map((thread) => thread.get({ plain: true }));

        res.render('explore', {
            threads, // Make sure the variable name matches the one used in the template
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;