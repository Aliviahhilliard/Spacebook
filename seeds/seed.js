const sequelize = require('../config/connection');
const { User, Thread, Comment } = require('../models');

const userData = require('./userData.json');
const threadData = require('./threadData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const thread of threadData) {
    await Thread.create({
      ...thread,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
