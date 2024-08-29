//import { z } from 'zod';
import { Activity } from '../../models/index.js';

const activityController = {
  async getAll(req, res) {
    try {
      const activities = await Activity.findAll({
        order: [['name', 'ASC']],
      });
      res.json(activities);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching activities' });
    }
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
