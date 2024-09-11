import 'dotenv/config';
import { z } from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string('Must be a string'),
});

const loginController = {
  async login(req, res, next) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const user = await User.findOne({
        where: { email: validatedData.email },
      });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = Scrypt.verify(
        validatedData.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      res.json({ message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
