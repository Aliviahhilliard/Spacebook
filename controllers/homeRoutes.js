const router = require('express').Router();
const { Thread, User, Comment, FriendConnect } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
      const threadData = await Thread.findAll({
          include: [
              {
                model: User,
                attributes: { exclude: ['password'] },
              },
          ],
      });

      const threads = threadData.map((thread) => thread.get({ plain: true }));

      res.render('explore', {
          threads, // Make sure the variable name matches the one used in the template
          logged_in: req.session.logged_in
      });

      // res.status(200).json(threads);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/create-thread', withAuth, (req, res) => {
  res.render('create-thread', { layout: 'main' }); // Render the create-thread form
});

// router.get('/explore', async (req, res) => {
//   try {
//     const threadData = await Thread.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     const threads = threadData.map((thread) => thread.get({ plain: true }));

//     //handlebars {{if threads.length}}
//     //{{each threads as |thread|}}
//     res.render('homepage', {
//       threads,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Thread 
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/friends', withAuth, async (req, res) => {
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
          user,
          logged_in: req.session.logged_in,
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

router.get('/signup', (req, res) => {
  res.render('signup', { layout: 'main' });
});

module.exports = router;
