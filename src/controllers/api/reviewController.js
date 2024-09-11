import { Review } from '../../models/index.js';

const reviewController = {
  async createReview(req, res) {
    try {
      const { content, rating, client_id, activity_id } = req.body;

      if (!content || !rating || !client_id || !activity_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newReview = await Review.create({
        content,
        rating,
        client_id,
        activity_id,
      });
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
      const newReviewData = req.body;

      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'review not found' });
      }

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
