const router = require('express').Router();
const { Thread, User, Comment, Img } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newThread = await Thread.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedThread = await Thread.update({
      ...req.body,
      user_id: req.session.user_id,
    },
      {
        where: { id: req.params.id }
      });

    res.status(200).json(updatedThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!threadData) {
      res.status(404).json({ message: 'Thread not found' });
      return;
    }

    res.status(200).json(threadData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment, include: { model: User } }
      ]
    });

    if (!threadData) {
      res.status(404).json({ message: 'No thread found with this id' });
      return;
    }

    const thread = threadData.get({ plain: true });

    res.render('view-thread', { layout: 'main', ...thread });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
