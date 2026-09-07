import sequelize from '../database/dbClientSequelize.js';

/**
 * Garde d'initialisation idempotente.
 *
 * Sort avec le code :
 *   0 -> ne PAS (ré)initialiser la base (elle est déjà initialisée, OU on n'a
 *        pas pu se connecter / vérifier de façon fiable : dans le doute on ne
 *        wipe jamais des données existantes).
 *   1 -> base joignable ET vide (table `activity` absente) : il faut lancer le
 *        `db:reset` (create + seed). C'est le SEUL cas où l'on réinitialise.
 *
 * Le compose fait : `node src/migrations/checkDb.js || npm run db:reset`
 * donc `db:reset` ne tourne qu'en cas de sortie 1.
 */
async function main() {
  // Attendre que Postgres soit prêt (jusqu'à ~30s) pour éviter un faux
  // "base vide" pendant le démarrage du conteneur postgres.
  let connected = false;
  for (let i = 0; i < 15; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await sequelize.authenticate();
      connected = true;
      break;
    } catch {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }
  }

  if (!connected) {
    console.error(
      'checkDb: Postgres injoignable — on NE réinitialise PAS (sécurité des données).'
    );
    process.exit(0);
  }

  try {
    const [rows] = await sequelize.query(
      "SELECT to_regclass('public.activity') AS t"
    );
    const initialized = Boolean(rows[0] && rows[0].t);
    console.log(
      initialized
        ? 'checkDb: base déjà initialisée — seed ignoré.'
        : 'checkDb: base vide — initialisation (create + seed) requise.'
    );
    await sequelize.close();
    process.exit(initialized ? 0 : 1);
  } catch (err) {
    console.error(
      'checkDb: erreur lors de la vérification — on NE réinitialise PAS.',
      err.message
    );
    process.exit(0);
  }
}

main();
