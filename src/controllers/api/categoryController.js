import { Category, Activity } from '../../models/index.js';

const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']],
      });
      res.json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des catégories',
      });
    }
  },
};

export default categoryController;
