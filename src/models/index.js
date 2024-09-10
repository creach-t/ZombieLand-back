import Activity from './Activity.js';
import Booking from './Booking.js';
import Category from './Category.js';
import User from './User.js';
import Price from './Price.js';
import Message from './Message.js';
import Review from './Review.js';

User.hasMany(Booking, {
  foreignKey: 'client_id',
  as: 'booking',
});
Booking.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

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

User.hasMany(Message, {
  foreignKey: 'client_id',
  as: 'messages',
});

Message.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

Review.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

User.hasMany(Review, {
  foreignKey: 'client_id',
  as: 'review',
});

Review.belongsToMany(Activity, {
  through: 'activity_has_review',
  as: 'activities',
  foreignKey: 'review_id',
  otherKey: 'activity_id',
});

Activity.belongsToMany(Review, {
  through: 'activity_has_review',
  as: 'reviews',
  foreignKey: 'activity_id',
  otherKey: 'review_id',
});

export { User, Booking, Activity, Category, Price, Message, Review };
