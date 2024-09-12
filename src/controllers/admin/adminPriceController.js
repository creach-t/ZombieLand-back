import { Price } from '../../models/index.js';

const adminPriceController = {
  pricesPage: async (req, res) => {
    try {
      const prices = await Price.findAll({
        order: [['price_id', 'ASC']],
      });
      res.render('admin-price', { prices, currentPage: 'prices' });
    } catch (error) {
      console.error(error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des prix : ${error.message}`;
      res.redirect('/admin/prices');
    }
  },

  updatePrice: async (req, res) => {
    try {
      const priceId = req.params.id;
      const { price } = req.body;
      const is_active = req.body.is_active ? true : false;

      // Check if price ID and price are provided
      if (!priceId || !price) {
        req.session.errorMessage =
          'Aucun prix sélectionné pour la mise à jour.';
        return res.redirect('/admin/prices');
      }

      // Update price
      await Price.update(
        { price: price, is_active: is_active },
        {
          where: { price_id: priceId },
        }
      );

      req.session.successMessage = 'Prix mis à jour avec succès.';
      res.redirect('/admin/prices');
    } catch (error) {
      console.error(error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour du prix : ${error.message}`;
      res.redirect('/admin/prices');
    }
  },

  createPrice: async (req, res) => {
    try {
      const { price, is_active } = req.body;

      // Check if price is provided
      if (!price) {
        req.session.errorMessage = 'Aucun prix fourni pour la création.';
        return res.redirect('/admin/prices');
      }

      // Create new price
      await Price.create({ price, is_active });

      req.session.successMessage = 'Prix créé avec succès.';
      res.redirect('/admin/prices');
    } catch (error) {
      console.error(error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la création du prix : ${error.message}`;
      res.redirect('/admin/prices');
    }
  },

  deletePrice: async (req, res) => {
    try {
      const priceId = req.params.id;

      // Check if price ID is provided
      if (!priceId) {
        req.session.errorMessage =
          'Aucun prix sélectionné pour la suppression.';
        return res.redirect('/admin/prices');
      }

      // Delete price
      const deletedPrice = await Price.destroy({
        where: { price_id: priceId },
      });

      if (deletedPrice) {
        req.session.successMessage = 'Prix supprimé avec succès.';
        res.redirect('/admin/prices');
      } else {
        req.session.errorMessage = 'Prix non trouvé pour la suppression.';
        res.redirect('/admin/prices');
      }
    } catch (error) {
      console.error(error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la suppression du prix : ${error.message}`;
      res.redirect('/admin/prices');
    }
  },
};

export default adminPriceController;
