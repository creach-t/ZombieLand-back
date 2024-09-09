import z from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';

// Schéma de validation des données de connexion
const loginSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: z.string().min(1, 'Le mot de passe ne peut pas être vide'),
});

const adminLoginController = {
  // LOGIN ACTION
  loginAction: async (req, res) => {
    // Vérification du jeton CSRF
    const csrfToken = req.body._csrf;
    if (!csrfToken || csrfToken !== req.session.csrfToken) {
      req.session.errorMessage =
        'Échec de la connexion : validation CSRF échouée.';
      return res.redirect('/admin');
    }

    // Validation des données de connexion
    const resultValidation = loginSchema.safeParse(req.body);
    if (!resultValidation.success) {
      req.session.errorMessage =
        'Problème avec la connexion : Données de connexion non valides.';
      return res.redirect('/admin');
    }

    const dataValidated = resultValidation.data;

    try {
      // Rechercher l'utilisateur par email
      const user = await User.findOne({
        where: { email: dataValidated.email },
      });

      if (!user) {
        req.session.errorMessage =
          'Identifiants incorrects. Veuillez réessayer.';
        return res.redirect('/admin');
      }

      // Vérification du mot de passe
      const isValidPassword = Scrypt.verify(
        dataValidated.password,
        user.password
      );
      if (!isValidPassword) {
        req.session.errorMessage =
          'Identifiants incorrects. Veuillez réessayer.';
        return res.redirect('/admin');
      }

      // Enregistrement de l'ID de l'utilisateur dans la session
      req.session.userId = user.user_id;

      // Redirection vers la page des réservations
      req.session.successMessage = 'Connexion réussie. Bienvenue !';
      return res.redirect('/admin/bookings');
    } catch (error) {
      console.trace(error);
      req.session.errorMessage = `Problème avec la connexion : ${error.message}`;
      return res.redirect('/admin');
    }
  },

  // LOGOUT
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
  },
};

export default adminLoginController;
