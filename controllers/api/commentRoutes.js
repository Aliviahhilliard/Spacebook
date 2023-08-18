const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update({
      ...req.body,
    },
      {
        where: {id: req.params.id}
    });

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        { model: User, attributes: ['username'] }
      ]
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific comment by ID
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] }
      ]
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments for a specific thread
router.get('/thread/:threadId', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        thread_id: req.params.threadId
      },
      include: [
        { model: User, attributes: ['username'] }
      ]
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;






