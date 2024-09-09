import crypto from 'crypto';

const adminPanelController = {
  homePage: (req, res) => {
    // Génération d'un jeton CSRF unique et stockage dans la session
    const csrfToken = crypto.randomBytes(24).toString('hex'); // Utilisation de crypto natif pour générer un token aléatoire
    req.session.csrfToken = csrfToken;

    // Rendre la page de login avec le jeton CSRF
    res.render('index', {
      csrfToken,
      errorMessage: req.session.errorMessage,
      currentPage: '',
    });

    req.session.errorMessage = null; // Réinitialiser le message d'erreur après affichage
  },
};

export default adminPanelController;
