import { Category, Activity } from '../../models/index.js';

const adminCategoryController = {
  categoriesPage: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Activity,
            as: 'activities',
            attributes: ['activity_id', 'name'],
          },
        ],
        order: [['category_id', 'ASC']],
      });

      res.render('admin-category', {
        categories,
        currentPage: 'categories',
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occurred with the database :\n${error.message}`);
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name_category } = req.body;
      if (!name_category) {
        return res.status(400).render('admin-category', {
          error: 'Le nom de la catégorie est requis.',
        });
      }

      await Category.create({
        name: name_category,
      });
      res.redirect('/admin/categories');
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      res
        .status(500)
        .send('Une erreur est survenue lors de la création de la réservation.');
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name_category } = req.body;
      const categoryId = req.params.id;

      if (!name_category) {
        return res.status(400).render('admin-category', {
          error: 'Le nom de la catégorie est requis.',
        });
      }

      const updatedCategory = await Category.update(
        { name: name_category },
        { where: { category_id: categoryId } }
      );

      if (updatedCategory[0]) {
        res.redirect('/admin/categories');
      } else {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      res
        .status(500)
        .send(
          'Une erreur est survenue lors de la mise à jour de la catégorie.'
        );
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      console.log('ID de la catégorie à supprimer:', categoryId);

      const deleteCategory = await Category.destroy({
        where: {
          category_id: categoryId,
        },
      });

      if (deleteCategory) {
        return res
          .status(200)
          .json({ message: 'Catégorie supprimée avec succès.' });
      } else {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      return res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de la catégorie.',
      });
    }
  },
};

export default adminCategoryController;
