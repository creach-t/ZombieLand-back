import { User } from '../../models/index.js';

const adminMemberController = {
  membersPage: async (req, res) => {
    try {
      // Fetch all members
      const members = await User.findAll({
        where: { role: 'user' },
        order: [['user_id', 'ASC']],
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });

      // Render the members page with fetched data
      res.render('admin-members', {
        members,
        currentPage: 'members',
      });
    } catch (error) {
      console.error(error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des membres : ${error.message}`;
      res.redirect('/admin/members');
    }
  },

  updateMember: async (req, res) => {
    try {
      const memberId = req.params.id;
      const { first_name, last_name, email} = req.body;

      // Check if member ID and required fields are provided
      if (!memberId) {
        req.session.errorMessage = 'Aucun membre sélectionné pour la mise à jour.';
        return res.redirect('/admin/members');
      }
      if (!first_name || !last_name || !email) {
        req.session.errorMessage = 'Tous les champs sont requis pour mettre à jour le membre.';
        return res.redirect('/admin/members');
      }

      // Verify member existence before updating
      const existingMember = await User.findByPk(memberId);
      if (!existingMember) {
        req.session.errorMessage = 'Le membre spécifié n\'existe pas.';
        return res.redirect('/admin/members');
      }

      // Update the member details
      await User.update(
        { first_name, last_name, email},
        { where: { user_id: memberId } }
      );

      // Set success message and redirect
      req.session.successMessage = 'Membre mis à jour avec succès.';
      res.redirect('/admin/members');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du membre:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour du membre : ${error.message}`;
      res.redirect('/admin/members');
    }
  },

  createMember: async (req, res) => {
    try {
      const { first_name, last_name, email} = req.body;

      // Check if all required fields are provided
      if (!first_name || !last_name || !email) {
        req.session.errorMessage = 'Tous les champs sont requis pour créer un membre.';
        return res.redirect('/admin/members');
      }

      // Create a new member in the database
      await User.create({
        first_name,
        last_name,
        email,
      });

      // Set success message and redirect
      req.session.successMessage = 'Membre créé avec succès.';
      res.redirect('/admin/members');
    } catch (error) {
      console.error('Erreur lors de la création du membre:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la création du membre : ${error.message}`;
      res.redirect('/admin/members');
    }
  },

  deleteMember: async (req, res) => {
    try {
      const memberId = req.params.id;

      // Check if member ID is provided
      if (!memberId) {
        req.session.errorMessage = 'Aucun membre sélectionné pour la suppression.';
        return res.redirect('/admin/members');
      }

      // Attempt to delete the member
      const deletedMember = await User.destroy({
        where: { user_id: memberId },
      });

      if (deletedMember) {
        // Set success message for deletion
        req.session.successMessage = 'Membre supprimé avec succès.';
        res.redirect('/admin/members');
      } else {
        // Set error message if member not found
        req.session.errorMessage = 'Membre non trouvé.';
        res.redirect('/admin/members');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du membre:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la suppression du membre : ${error.message}`;
      res.redirect('/admin/members');
    }
  },
};

export default adminMemberController;
