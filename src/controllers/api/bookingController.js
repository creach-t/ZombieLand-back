import { z } from 'zod';
import { Booking } from '../../models/index.js';
import { isBefore, parseISO } from 'date-fns';

const bookingSchema = z.object({

  date: z.string().min(1),
  status: z.string().min(1),
  nb_tickets: z.number().int().min(0).optional(),
  client_id: z.number().int().min(1),
});
const bookingController = {


  async getAllBooking(req, res) {
    const bookings = await Booking.findAll({
      order: [['date', 'ASC']],
      include: ['client'],
    });
    res.json(bookings);
  },

  async getOneBooking(req, res) {
    const idBooking = req.params.id;

    const booking = await Booking.findByPk(idBooking);
    res.json(booking);
  },

  async createBooking(req, res) {
    try {
      const dataBooking = bookingSchema.parse(req.body);

      const today = new Date();
      const bookingDate = parseISO(dataBooking.date);

      if (isBefore(bookingDate, today)) {
        return res.status(400).json({ message: 'You cannot book for a past date.' });
      }

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
          return res.status(400).json({ message: 'You cannot update to a past date.' });
        }
      }

      await booking.update(dataBooking);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteBooking(req, res) {
    const idBooking = req.params.id;

    const booking = await Booking.findByPk(idBooking);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.destroy();

    res.status(204).send();
  },
};

export default bookingController;
