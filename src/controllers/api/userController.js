import { z } from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'unSecretQuiDevraEtreFortEnProduction';

const userSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.string().min(1),
});

const userController = {
  async getAll(req, res) {
    const listAll = await User.findAll();
    res.json(listAll);
  },

  async getOne(req, res) {
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
   
    if (!token) {
      return res.status(401).json({ error: "Accès non-autorisé" })
    }
    
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const oneUser = await User.findByPk(id);
    
    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
    }

    if (decodedToken.userId !== oneUser.user_id) { 
      return res.status(403).json({ error: "Accès non-autorisé" });
    }

    res.json(oneUser);
  },

  async create(req, res) {
    const dataUser = userSchema.parse(req.body);
    const userCreated = await User.create(dataUser);
    res.status(201).json(userCreated);
  },

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;

    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
    }

    if (data.password) {
      data.password = Scrypt.hash(data.password);
    }

    await oneUser.update(data);
    res.json(oneUser);
  },

  async delete(req, res) {
    const id = req.params.id;
    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`nous n'avons pas trouvé cet utilisateur`);
    }

    await oneUser.destroy();
    res.status(204).send();
  },
};

export default userController;
