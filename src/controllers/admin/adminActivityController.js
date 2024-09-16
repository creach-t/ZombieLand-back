import { Activity, Category } from '../../models/index.js';

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^a-z0-9\-]/g, '') // Supprime les caractères non-alphanumériques sauf les tirets
    .replace(/--+/g, '-') // Remplace les tirets multiples par un seul tiret
    .trim('-'); // Enlève les tirets en début et fin
}

const adminActivityController = {
  activitiesPage: async (req, res) => {
    try {
      const activities = await Activity.findAll({
        include: [{ association: 'categories' }],
        order: [['activity_id', 'ASC']],
      });

      const categories = await Category.findAll({
        order: [['category_id', 'ASC']],
      });

      res.render('admin-activity', { 
        activities,
        categories,
        currentPage: 'activities' 
      });

    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des activités : ${error.message}`;
      res.redirect('/admin/activities');
    }
  },

  updateActivity: async (req, res) => {
    try {
      const activityId = req.params.id;
      const { name, minimal_age, capacity, description_short, description, x, y } = req.body;

      const selectedCategories = JSON.parse(req.body.categories);
     

      if (!activityId) {
        req.session.errorMessage = 'Aucune activité sélectionnée pour la mise à jour.';
        return res.redirect('/admin/activities');
      }

      if(!name, !minimal_age, !capacity, !description_short, !description, !x, !y) {
        req.session.errorMessage = 'Tous les champs sont requis pour mettre à jour l\'activité.';
        return res.redirect('/admin/activities');
      }

      if (minimal_age < 0) {
        req.session.errorMessage = 'L\'âge minimal ne peut pas être négatif.';
        return res.redirect('/admin/activities');
      }

      if (capacity < 0) {
        req.session.errorMessage = 'La capacité ne peut pas être négative.';
        return res.redirect('/admin/activities');
      }

      const existingActivity = await Activity.findByPk(activityId);
      if (!existingActivity) {
        req.session.errorMessage = 'L\'activité spécifiée n\'existe pas.';
        return res.redirect('/admin/activities');
      }

      await existingActivity.setCategories([]);
      const categories = await Category.findAll({
        where: {
          category_id: selectedCategories
        }
      });

      await Activity.update({
        name,
        minimal_age,
        capacity,
        description_short,
        description,
        x,
        y,
      }, {
        where: { activity_id: activityId }
      });

      await existingActivity.addCategories(categories);

      req.session.successMessage = 'Activité mise à jour avec succès.';
      res.redirect('/admin/activities');

      
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour de l'activité : ${error.message}`;
      res.redirect('/admin/activities');      
    }
  },

  createActivity: async (req, res) => {
    try {
      const { name, minimal_age, capacity, description_short, description, x, y, categories } = req.body;
      
      const selectedCategories = JSON.parse(categories);
     
      

      if (!name || !minimal_age || !capacity || !description_short || !description || !x || !y) {
        req.session.errorMessage = 'Tous les champs sont requis pour créer une activité.';
        return res.redirect('/admin/activities');
      }

      if (minimal_age < 0) {
        req.session.errorMessage = 'L\'âge minimal ne peut pas être négatif.';
        return res.redirect('/admin/activities');
      }

      if (capacity < 0) {
        req.session.errorMessage = 'La capacité ne peut pas être négative.';
        return res.redirect('/admin/activities');
      }

      const slug = generateSlug(name);

      const newActivity = await Activity.create({
        name,
        minimal_age,
        capacity,
        description_short,
        description,
        x,
        y,
        slug,
      });

      if (selectedCategories.length > 0) {
      const categoriesToAssign = await Category.findAll({
        where: {
          category_id: selectedCategories
        }
      });
      await newActivity.addCategories(categoriesToAssign);
    }

      req.session.successMessage = 'Activité créée avec succès.';
      res.redirect('/admin/activities');
      
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la création de l'activité : ${error.message}`;
      res.redirect('/admin/activities');
      
    }
  },

  deleteActivity: async (req, res) => {
    try {
      const activityId = req.params.id;

      if (!activityId) {
        req.session.errorMessage = 'Aucune activité sélectionnée pour la suppression.';
        return res.redirect('/admin/activities');
      }
      const existingActivity = await Activity.findByPk(activityId);
      if (!existingActivity) {
        req.session.errorMessage = 'L\'activité spécifiée n\'existe pas.';
        return res.redirect('/admin/activities');
      }
      await Activity.destroy({
        where: { activity_id: activityId }
      });

      req.session.successMessage = 'Activité supprimée avec succès.';
      res.redirect('/admin/activities');    
      
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la suppression de l'activité : ${error.message}`;
      res.redirect('/admin/activities ');
    }
  }
};

export default adminActivityController;
