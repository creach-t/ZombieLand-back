import { Activity, Category, Review, User } from '../../models/index.js';

const activityController = {
  async getAll(req, res) {
    try {
      const activities = await Activity.findAll({
        order: [['name', 'ASC']],
        include: [
          {
            model: Category,
            as: 'categories',
            attributes: ['category_id', 'name'],
            through: { attributes: [] },
          },
        ],
      });

      res.json(activities);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des activités',
      });
    }
  },

  async getOneActivity(req, res) {
    try {
      const activity = await Activity.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: Category,
            as: 'categories',
            attributes: ['category_id', 'name'],
          },
          {
            model: Review,
            as: 'reviews',
            attributes: ['review_id', 'content', 'rating', 'status'],
            required: false,
            where: { status: 'approved' },
            include: [
              {
                model: User,
                as: 'client',
                attributes: ['first_name', 'last_name'],
              },
            ],
          },
        ],
      });

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      res.json(activity);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'activité:", error);
      res.status(500).json({
        error: 'An error occurred while fetching the activity',
      });
    }
  },

  async getActivitiesByCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const activities = await Activity.findAll({
        include: [
          {
            model: Category,
            as: 'categories',
            where: { category_id: categoryId },
            attributes: ['category_id', 'name'],
            through: { attributes: [] },
          },
        ],
        order: [['name', 'ASC']],
      });

      res.json(activities);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des activités par catégorie:',
        error
      );
      res.status(500).json({
        error: 'An error occurred while fetching activities by category',
      });
    }
  },
};

export default activityController;
