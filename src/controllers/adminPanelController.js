/* eslint-disable */

import z from 'zod';
import { Booking, User } from '../models/index.js';
import Scrypt from '../utils/scrypt.js';

  const loginSchema = z.object({
    email: z.string().email('Doit être un email valide'),
    password: z.string('Doit être une chaîne de caractères'),
  });

const adminPanelController = {

  // PAGES CONTROLLER

  homePage: (req, res) => {
    res.render('index', {currentPage: 'home'});
  },

  categoriesPage: (req, res) => {
    res.render('admin-category', { currentPage: 'categories' });
  },

  bookingsPage: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [{
          association: 'client'
        }]
      });
      const users = await User.findAll({
        where: {
          role: "user",
          },
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });
      res.render('admin-booking', {
        bookings, users, currentPage: 'bookings'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  membersPage: (req, res) => {
    res.render('admin-members', {currentPage: 'members'});
  },

  pricesPage: (req, res) => {
    res.render('admin-price', {currentPage: 'prices'});
  },

  activitiesPage: (req, res) => {
    res.render('admin-activity', {currentPage: 'activities'});
  },

deleteBooking: async (req, res) => {
    try {
      // Récupérer l'ID de la réservation depuis les paramètres de la requête
      const bookingId = req.params.id;

      // Trouver et supprimer la réservation dans la base de données
      const deletedBooking = await Booking.destroy({
        where: {
          booking_id: bookingId,
        },
      });

      if (deletedBooking) {
        res.redirect('/admin/bookings').status(200).json({ message: 'Réservation supprimée avec succès.' });
      } else {
        res.status(404).json({ error: 'Réservation non trouvée.' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la réservation.' });
    }
  },

//LOGIN

  loginAction: async (req, res) => {
    const resultValidation = loginSchema.safeParse(req.body);

    if (!resultValidation.success) {
      res.send(resultValidation.error.errors);
      return;
    }

    const dataValidated = resultValidation.data;

    try {
      // Je vais récupérer depuis ma base de données l'utilisateur qui a l'email donné
      const user = await User.findOne({
        where: {
          email: dataValidated.email,
        },
      });

      if (!user) {
        res.render('login', {
          errors: [
            {
              message: 'Identifiants incorrects',
              path: [],
            },
          ],
        });
        return;
      }

      // Je vais vérifier que le mot de passe donné correspond à celui en base de données
       const isValidPassword = Scrypt.verify(
         dataValidated.password,
         user.password,
       );


      if (!isValidPassword) {
        res.render('login', {
          errors: [
            {
              message: 'Identifiants incorrects',
              path: [],
            },
          ],
        });
        return;
      }

      // J'enregistre l'id de l'utilisateur en session
      req.session.userId = user.user_id;

      // Je redirige l'utilisateur vers la page d'accueil
      res.redirect('/admin/bookings');
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .render('500', {
          error: `Une erreur est survenue lors de l'authentification \n ${error}`,
        });
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/admin');
  },

};

export default adminPanelController;