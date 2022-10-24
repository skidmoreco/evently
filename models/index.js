const Event = require('./Event');
const User = require('./User')

User.hasMany(Event, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Event, User };
