const User = require('./User');
const FriendConnect =  require('./FriendConnect');
const Thread = require('./Thread');
const Comment = require('./Comment');

User.hasMany(Thread, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(User, {
    as: 'friends',
    through: 'friendconnect',
    foreignKey: 'user_id',
    otherKey: 'friend_id',
});

Thread.belongsTo(User, {
    foreignKey: 'user_id'
});
Thread.hasMany(Comment, {
    foreignKey: 'thread_id'
});

Comment.belongsTo(Thread, {
    foreignKey: 'thread_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, FriendConnect, Thread, Comment, }