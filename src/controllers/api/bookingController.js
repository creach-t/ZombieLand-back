import { z } from 'zod';
import {Booking} from '../models/index.js'

bookingSchema = z.object({
date: z.string().min(1),
status: z.string().min(1),
nb_tickets: z.number().int().min(0).optional(),

});
const bookingController = {
async createBooking(req,res){
const dataBooking = bookingSchema.parse(req.body);

const booking = await Booking.create(data);
res.status(201).json(booking)
},

async deleteBooking(req,res) {
const 

}

};

export default bookingController