const sequelize = require('../../config/connection');
const { User, Thread, Comment } = require('../models');

const userData = require('./userData.json');
const threadData = require('./threadData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Insert user data
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create threads and comments
  for (const thread of threadData) {
    await Thread.create({
      ...thread,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();