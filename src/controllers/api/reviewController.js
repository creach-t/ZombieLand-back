import { z } from 'zod';
import { Review } from '../../models/index.js';

const reviewSchema = z.object({
  content: z.string().min(1),
  activity_id: z.number().int().min(0),
  rating: z.number().int().min(0),
  client_id: z.number().int().min(0),
});
const reviewController = {
  async createReview(req, res) {
    try {
      const dataReview = reviewSchema.parse(req.body);

      const loggedInUserId = req.user.user_id; // ID de l'utilisateur dans la session
      const clientIdInRequest = dataReview.client_id;

      if (loggedInUserId !== clientIdInRequest) {
        return res
          .status(403)
          .json({ message: 'You can only comment for your own account.' });
      }

      if (
        !dataReview.content ||
        !dataReview.rating ||
        !dataReview.client_id ||
        !dataReview.activity_id
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newReview = await Review.create(dataReview);
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Erreur lors de la création de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while creating the review',
      });
    }
  },

  async updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const newReviewData = reviewSchema.parse(req.body); // Valider les données avec zod

      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      const loggedInUserId = req.user.user_id; // ID de l'utilisateur dans la session
      const clientIdInRequest = newReviewData.client_id;

      // Vérifier si l'utilisateur connecté correspond à celui qui a posté l'avis
      if (loggedInUserId !== clientIdInRequest) {
        return res
          .status(403)
          .json({ message: 'You can only update your own review.' });
      }

      // Mettre à jour l'avis
      await review.update(newReviewData);
      res.json(review);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while updating the review',
      });
    }
  },

  async deleteReview(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      const loggedInUserId = req.user.user_id; // ID de l'utilisateur dans la session

      // Vérifier si l'utilisateur connecté est celui qui a posté l'avis
      if (loggedInUserId !== review.client_id) {
        return res
          .status(403)
          .json({ message: 'You can only delete your own review.' });
      }

      // Supprimer l'avis
      await review.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while deleting the review',
      });
    }
  },
};

export default reviewController;
