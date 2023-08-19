const router = require('express').Router();
const { User } = require('../../models');

router.get('/signup', (req, res) => {
    res.render('signup', { layout: 'main' });
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.name, // Make sure to use 'username' field here
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;