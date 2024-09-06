import { Activity } from '../../models/index.js';

const adminActivityController = {
  activitiesPage: async (req, res) => {
    try {
      const activities = await Activity.findAll({
        include: [{ association: 'categories' }],
        order: [['activity_id', 'ASC']],
      });

      res.render('admin-activity', { 
        activities,
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

      console.log(req.body);
      

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
      const { name, minimal_age, capacity, description_short, description, x, y } = req.body;

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

      await Activity.create({
        name,
        minimal_age,
        capacity,
        description_short,
        description,
        x,
        y,
      });

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
