import { Message, User, Activity } from '../../models/index.js';

const messageController = {
  async getAll(req, res) {
    try {
      const messages = await Message.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['user_id', 'first_name', 'last_name'],
          },
          {
            model: Activity,
            as: 'activity',
            attributes: ['activity_id', 'name'],
          },
        ],
      });
      res.json(messages);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des avis',
      });
    }
  },

  async getOneMessage(req, res) {
    try {
      const messageId = req.params.id;
      const message = await Message.findByPk(messageId, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['user_id', 'first_name', 'last_name'],
          },
        ],
      });

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json(message);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while fetching the message',
      });
    }
  },

  async createMessage(req, res) {
    try {
      const { content, rating, client_id, activity_id } = req.body;

      if (!content || !rating || !client_id || !activity_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newMessage = await Message.create({
        content,
        rating,
        client_id,
        activity_id,
      });
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Erreur lors de la création de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while creating the message',
      });
    }
  },

  async updateMessage(req, res) {
    try {
      const messageId = req.params.id;
      const newMessageData = req.body;

      const message = await Message.findByPk(messageId);

      if (!message) {
        return res.status(404).json({ error: 'message not found' });
      }

      await message.update(newMessageData);
      res.json(message);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while updating the message',
      });
    }
  },

  async deleteMessage(req, res) {
    try {
      const messageId = req.params.id;
      const message = await Message.findByPk(messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      await message.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while deleting the message',
      });
    }
  },
};

export default messageController;
