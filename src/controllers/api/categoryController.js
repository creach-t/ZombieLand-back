import { z } from 'zod';
import { Category } from '../../models/index.js'

const categorySchema = z.object({
    name: z.string().min(1),
});

const categoryController = {
    async getAll(req, res) {
        const listAll = await Category.findAll();
        res.json(listAll);
    },

    async getOne(req, res) {
        const id = req.params.id;
        const oneCategory = await Category.findByPk(id);

        if(!oneCategory) {
            throw new Error(`Nous n'avons pas trouvé cette catégorie`);
        };

        res.json(oneCategory);
    },

    async create(req, res) {
        const categoryCreated = categorySchema.parse(req.body);
        const category = await Category.create(categoryCreated);
        res.status(201).json(category);
    },

    async update(req, res) {
        const id = req.params.id;
        data = req.body;
        const oneCategory = await Category.findByPk(id);

        if(!oneCategory) {
            throw new Error(`Nous n'avons pas trouvé cette catégorie`);
        };

        await oneCategory.update(data);
        res.json(oneCategory);
    },

    async delete(req, res) {
        const id = req.params.id;
        const oneCategory = await Category.findByPk(id);

        if(!oneCategory) {
            throw new Error(`Nous n'avons pas trouvé cette catégorie`);
        };

        await oneCategory.destroy();
        res.status(204).send();
    },

};


export default categoryController