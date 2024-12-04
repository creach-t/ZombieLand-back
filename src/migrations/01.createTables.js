import sequelize from '../database/dbClientSequelize.js';
import '../models/index.js';

(async () => {
  console.log('Syncing database');
  await sequelize.sync({ force: true });
  console.log('Database synced');
  await sequelize.close();
})();