import { Price } from '../../models/index.js';

const priceController = {
  async getOne(req, res) {
    try {
      const price = await Price.findOne({
        where: {
          is_active: true,
        },
      });

      res.json(price);
    } catch (error) {
      console.error('Erreur lors de la récupération du prix:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération du prix',
      });
    }
  },
};

export default priceController;
