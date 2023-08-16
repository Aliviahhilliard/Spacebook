const router = require('express').Router();
const { FriendConnect, User } = require('../../models');
const withAuth = require('../../utils/auth');

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