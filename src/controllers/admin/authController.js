import z from 'zod';
import { User } from '../../models/index.js'
import Scrypt from '../utils/scrypt.js';

// Pour valider nos données, on va utiliser une librairie de schéma de validation appelée zod.
// Ici je créer un schéma qui correspond à ce que je veux valider pour la route POST /signup
const passwordSchema = z
  .string()
  .min(6, 'Doit contenir au moins 6 caractères')
  .regex(/[0-9]/, 'Doit contenir au moins un chiffre')
  .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Doit contenir au moins une minuscule');

const signupSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: passwordSchema,
  firstname: z.string('Doit être une chaîne de caractères'),
  lastname: z.string('Doit être une chaîne de caractères'),
  confirmation: passwordSchema,
});

const loginSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: z.string('Doit être une chaîne de caractères'),
});