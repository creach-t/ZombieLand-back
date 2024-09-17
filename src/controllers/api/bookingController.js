import { z } from 'zod';
import { Booking } from '../../models/index.js';
import { isBefore, parseISO, differenceInDays } from 'date-fns';

const bookingSchema = z.object({
  date: z.string().min(1),
  status: z.string().min(1),
  nb_tickets: z.number().int().min(0).optional(),
  client_id: z.number().int().min(1),
});
const bookingController = {
  async createBooking(req, res) {
    try {
      // Valider le corps de la requête avec bookingSchema
      const dataBooking = bookingSchema.parse(req.body);

      // Vérification de l'utilisateur connecté dans la session
      const loggedInUserId = req.user.user_id; // ID de l'utilisateur dans la session
      const clientIdInRequest = dataBooking.client_id; // ID de l'utilisateur dans le corps de la requête

      // Vérifier si l'utilisateur connecté correspond à celui dans le corps de la requête
      if (loggedInUserId !== clientIdInRequest) {
        return res
          .status(403)
          .json({ message: 'You can only book for your own account.' });
      }

      // Vérifier si la date de réservation est dans le futur
      const today = new Date();
      const bookingDate = parseISO(dataBooking.date);

      if (isBefore(bookingDate, today)) {
        return res
          .status(400)
          .json({ message: 'You cannot book for a past date.' });
      }
      // Créer la réservation
      const booking = await Booking.create(dataBooking);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateBooking(req, res) {
    try {
      const idBooking = req.params.id;
      const dataBooking = bookingSchema.partial().parse(req.body);

      const booking = await Booking.findByPk(idBooking);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      if (dataBooking.date) {
        const today = new Date();
        const bookingDate = parseISO(dataBooking.date);

        if (isBefore(bookingDate, today)) {
          return res
            .status(400)
            .json({ message: 'You cannot update to a past date.' });
        }
      }

      await booking.update(dataBooking);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async CancelBooking(req, res) {
    try {
      const idBooking = req.params.id;
  
      const booking = await Booking.findByPk(idBooking);
      if (!booking) {
        return res.status(404).json({ message: `La réservation n'a pas été trouvée` });
      }
  
      if (booking.status.toLowerCase() !== 'pending') {
        return res.status(400).json({ message: 'La réservation ne peut pas être annulée car elle n\'est pas en attente.' });
      }
  
      const bookingDate = new Date(booking.date);
      const currentDate = new Date();
      const daysUntilBooking = differenceInDays(bookingDate, currentDate);
  
      if (daysUntilBooking < 10) {
        return res.status(400).json({ message: 'La réservation ne peut pas être annulée car elle a lieu dans moins de 10 jours.' });
      }
  
      booking.status = 'canceled';
      await booking.save();
  
      res.status(200).json({ message: 'Réservation annulée avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default bookingController;
