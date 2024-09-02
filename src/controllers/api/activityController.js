//import { z } from 'zod';
import { Activity } from '../../models/index.js';

const activityController = {
  async getAll(req, res) {
    try {
      const { category } = req.query; // Extraire la catégorie des requêtes query params

      const filter = {};
      if (category) {
        // Ajouter un filtre si une catégorie est spécifiée
        filter.category_id = category;
      }

      const activities = await Activity.findAll({
        where: filter, // Appliquer les filtres si présents
        order: [['name', 'ASC']],
      });

      res.json(activities);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      res
        .status(500)
        .json({ error: 'Une erreur est survenue lors de la récupération des activités' });
    }
  },


  async getOneActivity(req, res) {
    try {
      const activityId = req.params.id;
      const activity = await Activity.findByPk(activityId);
      res.json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching one activity' });
    }
  },
};

export default activityController;
