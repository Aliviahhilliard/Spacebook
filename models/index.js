const User = require('./User');
const Img = require('./Img')
const FriendConnect = require('./FriendConnect');
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

User.hasOne(Img, {
    foreignKey: 'user_id',
});

Img.belongsTo(User, {
    foreignKey: 'user_id'
})

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

module.exports = { User, Img, FriendConnect, Thread, Comment, }