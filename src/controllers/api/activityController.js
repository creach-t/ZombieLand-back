import { z } from 'zod';
import {Activity} from '../../models/index.js'

const activityController = {
async getAll(req,res) {
    const activities = await Activity.findAll(
        {
            order:[['name', 'ASC']]
        }
    );
    res.json(activities);
},

async getOneActivity(req,res) {
const activityId = req.params.id;
const activity = await Activity.findByPk(activityId);
res.json(activity)
},

}


export default activityController