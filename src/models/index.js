import Activity from './Activity.js';
import Booking from './Booking.js';
import Category from './Category.js';
import User from './User.js';
import Price from './Price.js';
import Message from './Message.js';
import Review from './Review.js';

Activity.belongsToMany(Category, {
  through: 'activity_has_category',
  as: 'categories',
  foreignKey: 'activity_id',
  otherKey: 'category_id',
});

Category.belongsToMany(Activity, {
  through: 'activity_has_category',
  as: 'activities',
  foreignKey: 'category_id',
  otherKey: 'activity_id',
});

User.hasMany(Booking, {
  foreignKey: 'client_id',
  as: 'booking',
});
Booking.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

User.hasMany(Message, {
  foreignKey: 'sender_id',
  as: 'messages',
});

Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

Review.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

User.hasMany(Review, {
  foreignKey: 'client_id',
  as: 'review',
});

Review.belongsTo(Activity, {
  foreignKey: 'activity_id',
  as: 'activity',
});

Activity.hasMany(Review, {
  foreignKey: 'activity_id',
  as: 'reviews',
});

export { User, Booking, Activity, Category, Price, Message, Review };
