import "dotenv/config";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
  // logging: false // Pour désactiver l'affichage en console des requêtes SQL que Sequelize passe vers la BDD
});
export default sequelize;
