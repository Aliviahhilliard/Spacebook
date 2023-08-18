const router = require('express').Router();
const { User, Thread, Image } = require('../../models');
const withAuth = require('../../utils/auth'); // Import withAuth

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: Thread 
        },
        {
          model: Image,
        },
      ], // Include associated threads
    });

    const user = userData.get({ plain: true });

    res.render('profile', { layout: 'main', user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/create-thread', withAuth, (req, res) => {
  res.render('create-thread', { layout: 'main' }); // Render the create-thread form
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Thread, Image],
    });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
