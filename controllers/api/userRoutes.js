const router = require('express').Router();
const { User, Thread } = require('../../models');
const multer = require('multer');
const withAuth = require('../../utils/auth'); // Import withAuth

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploaded_images/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-spacebook-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Cannot accept file with that extension. Please only upload jpeg and png files.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    imageUrl = req.file.path.substring(6);
    const userData = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: imageUrl
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
      ], // Include associated threads
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
       user,
       logged_in: true
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create-thread', withAuth, (req, res) => {
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
