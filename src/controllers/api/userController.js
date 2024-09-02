import { z } from 'zod';
import { User } from '../../models/index.js';

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
    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
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
    data = req.body;
    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
    }

    await oneUser.update(data);
    res.json(oneUser);
  },  

    async delete(req, res) {
        const id = req.params.id;
        const oneUser = await User.findByPk(id);

        if(!oneUser) {
            throw new Error(`nous n'avons pas trouvé cet utilisateur`);
        };

        await oneUser.destroy();
        res.status(204).send();
    },
};

export default userController;
