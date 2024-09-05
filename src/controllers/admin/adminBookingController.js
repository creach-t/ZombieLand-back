import { Booking, User, Category, Activity } from '../../models/index.js';
const adminBookingController = {
  bookingsPage: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          {
            association: 'client',
          },
        ],
        order: [['booking_id', 'ASC']],
      });
      const users = await User.findAll({
        where: {
          role: 'user',
        },
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });
      res.render('admin-booking', {
        bookings,
        users,
        currentPage: 'bookings',
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occurred with the database :\n${error.message}`);
    }
  },

  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.id; // Récupérer l'ID de la réservation à partir des paramètres de l'URL
      const { visitors, date, client_id } = req.body; // Récupérer les données mises à jour du formulaire

      // Mise à jour de la réservation
      await Booking.update(
        {
          client_id: client_id,
          nb_tickets: visitors,
          date: date,
        },
        {
          where: { booking_id: bookingId },
        }
      );

      res.redirect('/admin/bookings'); // Rediriger après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      res
        .status(500)
        .send(
          'Une erreur est survenue lors de la mise à jour de la réservation.'
        );
    }
  },

  createBooking: async (req, res) => {
    try {
      const { client_id, visitors, date } = req.body; // Récupérer les données du formulaire

      // Valider les champs requis
      if (!client_id || !visitors || !date) {
        return res.status(400).send('Tous les champs sont requis.');
      }

      // Créer une nouvelle réservation dans la base de données
      await Booking.create({
        client_id: client_id,
        nb_tickets: visitors,
        date: date,
        status: 'pending',
      });

      // Rediriger vers la page de gestion des réservations après création
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      res
        .status(500)
        .send('Une erreur est survenue lors de la création de la réservation.');
    }
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
        res
          .redirect('/admin/bookings')
          .status(200)
          .json({ message: 'Réservation supprimée avec succès.' });
      } else {
        res.status(404).json({ error: 'Réservation non trouvée.' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de la réservation.',
      });
    }
  },
};

export default adminBookingController;
