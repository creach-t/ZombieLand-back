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
              receiver_id: 11,
              isRead: false, // Seulement les messages non lus
            },
            required: false,
          },
        ], // Renvoyer également les utilisateurs sans messages non lus  }],
      });

      // Récupérer tous les messages
      const membersWithUnread = members.map((member) => {
        return {
          ...member.dataValues,
          hasUnreadMessages: member.messages && member.messages.length > 0,
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
};

export default adminMessageController;
