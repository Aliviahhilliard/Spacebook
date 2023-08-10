const User = require('./User');
const FriendConnect =  require('./FriendConnect');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
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
    foreignKey: 'user_id'
});

User.belongsToMany(User, {
    as: 'userFriends',
    through: 'friendconnect',
    foreignKey: 'friend_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, FriendConnect, Post, Comment, }