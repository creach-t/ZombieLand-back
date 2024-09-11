import { Review } from '../../models/index.js';

const adminMemberController = {
  reviewsPage: async (req, res) => {
    try {
      // Fetch all reviews
      const reviews = await Review.findAll({
        order: [['review_id', 'ASC']],
        // attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });

      // Render the reviews page with fetched data
      res.render('admin-reviews', {
        reviews,
        currentPage: 'reviews',
      });
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des commentaires : ${error.message}`;
      res.redirect('/admin/reviews');
    }
  },
  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.id;

      if (!reviewId) {
        req.session.errorMessage =
          'Aucun commentaire sélectionné pour la suppression.';
        return res.redirect('/admin/activities');
      }
      const existingreview = await Review.findByPk(reviewId);
      if (!existingreview) {
        req.session.errorMessage = "Le commentaire spécifié n'existe pas.";
        return res.redirect('/admin/reviews');
      }
      await Review.destroy({
        where: { review_id: reviewId },
      });

      req.session.successMessage = 'Commentaire supprimé avec succès.';
      res.redirect('/admin/reviews');
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la suppression du commentaire : ${error.message}`;
      res.redirect('/admin/reviews ');
    }
  },
};

export default adminMemberController;
