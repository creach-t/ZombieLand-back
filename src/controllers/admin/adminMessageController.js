import { User } from '../../models/index.js';

const adminMessageController = {
  messagePage: async (req, res) => {
    const members = await User.findAll({
        where: { role: 'user' },
        order: [['user_id', 'ASC']],
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });
      console.log(members.data);
      
    res.render('admin-messages', { members, currentPage: 'messages', });
  },
};

export default adminMessageController;
