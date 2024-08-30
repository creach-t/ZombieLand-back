//import { z } from 'zod';
import { Activity } from '../../models/index.js';

const activityController = {
  async getAll(req, res) {
    const activities = await Activity.findAll({
      order: [['name', 'ASC']],
    });
    console.log(activities);
    res.json(activities);
  },

  async getOneActivity(req, res) {
    try {
      const activityId = req.params.id;
      const activity = await Activity.findByPk(activityId);
      res.json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching one activity' });
    }
  },
};

export default activityController;
