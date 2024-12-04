import { Review, User, Activity } from '../../models/index.js';

const adminMemberController = {
  reviewsPage: async (req, res) => {
    try {
      const reviews = await Review.findAll({
        include: [
          {
            model: User,
            as: 'client', // Inclure l'utilisateur qui a posté la review
            attributes: ['first_name', 'last_name'], // Sélectionner les champs nécessaires
          },
          {
            model: Activity,
            as: 'activity', // Inclure l'activité liée à la review
            attributes: ['name'], // Sélectionner le nom de l'activité
          },
        ],
        order: [['review_id', 'ASC']],
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
  validateReview: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const existingreview = await Review.findByPk(reviewId);

      if (!existingreview) {
        req.session.errorMessage = "Le commentaire spécifié n'existe pas.";
        return res.redirect('/admin/reviews');
      }
      await Review.update(
        { status: 'approved' },
        {
          where: { review_id: reviewId },
        }
      );

      req.session.successMessage = 'Commentaire validé avec succès.';
      res.redirect('/admin/reviews');
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la validation du commentaire : ${error.message}`;
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
