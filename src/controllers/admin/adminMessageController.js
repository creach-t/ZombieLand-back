import { User, Message } from '../../models/index.js';
import 'dotenv/config';
import { Op } from 'sequelize';

const adminMessageController = {
  async getAllFromOneConversation(req, res) {
    try {
      const userId = req.params.id;

      const admin = await User.findOne({
        where: {
          role: 'admin',
        },
      });

      const adminId = admin.user_id;

      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            // L'utilisateur envoie des messages à l'un des admins
            { sender_id: userId, receiver_id: adminId },
            // Un admin envoie des messages à l'utilisateur
            { sender_id: adminId, receiver_id: userId },
          ],
        },
        order: [['message_id', 'ASC']], // Tri par date croissante
      });

      res.status(200).json({
        messages,
        adminId,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des avis',
      });
    }
  },

  async createMessage(req, res) {
    try {
      const { message, sender_id, receiver_id } = req.body;

      if (!message || !sender_id || !receiver_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newMessage = await Message.create({
        message,
        sender_id,
        receiver_id,
      });
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Erreur lors de la création du message:', error);
      res.status(500).json({
        error: 'An error occurred while creating the message',
      });
    }
  },
  messagePage: async (req, res) => {
    try {
      const admin = await User.findOne({
        where: {
          role: 'admin',
        },
      });

      const adminId = admin.user_id;
      // Récupérer tous les membres (utilisateurs)
      const members = await User.findAll({
        where: { role: 'user' },
        order: [['user_id', 'ASC']],
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
        include: [
          {
            model: Message,
            as: 'messages',
            where: {
              receiver_id: adminId, // Filtrer les messages pour ce destinataire
            },
            required: true, // Inclure uniquement les utilisateurs ayant des messages
          },
        ],
      });

      // Ajouter la propriété hasUnreadMessages pour chaque utilisateur
      const membersWithUnread = members.map((member) => {
        // Vérifier s'il y a des messages non lus
        const hasUnreadMessages = member.messages.some(
          (message) => !message.isRead
        );

        return {
          ...member.dataValues,
          hasUnreadMessages, // Ajouter la propriété hasUnreadMessages
        };
      });

      // Renvoyer les membres et les messages à la vue EJS
      res.render('admin-messages', {
        members: membersWithUnread,
        adminId,
        BACK_URL: process.env.BACK_URL,
        currentPage: 'messages',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      res.status(500).send('Erreur serveur');
    }
  },

  async getMembersList(req, res) {
    const members = await User.findAll({
      where: { role: 'user' },
      order: [['user_id', 'ASC']],
      attributes: ['user_id', 'first_name', 'last_name', 'email'],
      include: [
        {
          model: Message,
          as: 'messages',
          where: { receiver_id: 11 },
          required: true,
        },
      ],
    });

    // Ajouter une propriété `hasUnreadMessages` pour chaque utilisateur
    const membersWithUnread = members.map((member) => ({
      ...member.dataValues,
      hasUnreadMessages: member.messages.some((message) => !message.isRead),
    }));

    res.render('partials/member-list', { members: membersWithUnread });
  },

  async messageMarkAsRead(req, res) {
    const admin = await User.findOne({
      where: {
        role: 'admin',
      },
    });

    const adminId = admin.user_id;
    const userId = Number(req.params.id);

    try {
      const updatedMessages = await Message.update(
        { isRead: true },
        {
          where: {
            sender_id: userId,
            receiver_id: adminId,
            isRead: false, // Seulement les messages non lus
          },
        }
      );

      if (updatedMessages) {
        res.status(200).send({ message: 'Messages marked as read' });
      } else {
        res.status(404).send({ error: 'No messages found to update' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Failed to mark messages as read' });
    }
  },

  async deleteAllMessagesFromConversation(req, res) {
    try {
      const userId = req.params.id;

      // Trouver l'admin
      const admin = await User.findOne({
        where: {
          role: 'admin',
        },
      });

      const adminId = admin.user_id;

      // Supprimer tous les messages de la conversation
      const deletedMessagesCount = await Message.destroy({
        where: {
          [Op.or]: [
            { sender_id: userId, receiver_id: adminId },
            { sender_id: adminId, receiver_id: userId },
          ],
        },
      });

      // Vérifier si des messages ont été supprimés
      if (deletedMessagesCount > 0) {
        res
          .status(200)
          .json({ message: 'Tous les messages ont été supprimés' });
      } else {
        res
          .status(404)
          .json({ message: 'Aucun message trouvé pour cette conversation' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des messages:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression des messages',
      });
    }
  },
};

export default adminMessageController;
