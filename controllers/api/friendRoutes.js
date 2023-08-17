const router = require('express').Router();
const { FriendConnect, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch the user's friends along with their details
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: User,
                    as: 'friends',
                },
            ],
        });

        const user = userData.get({ plain: true });

        res.render('friends', {
            layout: 'main',
            user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Add a friend
router.post('/:id', withAuth, async (req, res) => {
    try {
        const friendId = req.params.id;
        const userId = req.session.user_id;

        // Check if the friendship already exists
        const existingFriendship = await FriendConnect.findOne({
            where: {
                user_id: userId,
                friend_id: friendId
            }
        });

        if (existingFriendship) {
            return res.status(400).json({ message: 'Friendship already exists' });
        }

        // Create a new friendship entry in the FriendConnect model
        const newFriendship = await FriendConnect.create({
            user_id: userId,
            friend_id: friendId
        });

        res.status(200).json(newFriendship);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;