const router = require('express').Router();
const { Thread, User, Comment, FriendConnect } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        id: 1
      },
      include: [
        {
          model: User,
          as: 'friends',
          include: [
            {
              model: Thread,
              include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ],
            },
          ],
        },
      ],
    });

    const user = userData.map((thread) => thread.get({ plain: true }));

    console.log(user[0].friends[0].threads);

    var friendThreads = []

      for(let i=0; i<user[0].friends.length; i++) {
        friendThreads = friendThreads.concat(user[0].friends[i].threads)
        console.log(friendThreads);
      };

    res.render('homepage', { 
      friendThreads, 
      logged_in: req.session.logged_in 
    });
    // res.status(200).json(friendThreads)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/explore', async (req, res) => {
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

    res.render('homepage', { 
      threads, 
      logged_in: req.session.logged_in 
    });
    // res.status(200).json(threads);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/thread/:id', async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    res.render('thread', {
      ...thread,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(thread)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Thread }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
