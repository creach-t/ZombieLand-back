import { z } from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../utils/scrypt.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'unSecretQuiDevraEtreFortEnProduction';
const JWT_EXPIRY = '288h';

const signinSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string().min(6, 'Password must contain at least 6 characters')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
});

const signinController = {
  async signin(req, res, next) {
    try {
      const validatedData = signinSchema.parse(req.body);

      const existingUser = await User.findOne({ where: { email: validatedData.email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already in use' }); // Conflict error
      }

      const hashedPassword = Scrypt.hash(validatedData.password);

      const newUser = await User.create({
        email: validatedData.email,
        password: hashedPassword,
        firstname: validatedData.firstname,
        lastname: validatedData.lastname,
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      res.status(201).json({ message: 'User created successfully', token });

    } catch (error) {
      next(error);
    }
  },
};

export default signinController;