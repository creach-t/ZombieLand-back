import 'dotenv/config';
import { z } from 'zod';
import { Booking, User } from '../../models/index.js';
import nodemailer from 'nodemailer';
import Scrypt from '../../utils/scrypt.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRY = process.env.JWT_EXPIRY;

const userSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.string().min(1),
});

const userController = {
  async getOne(req, res) {
    const oneUser = await User.findOne({
      where: { user_id: req.user.user_id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Booking,
          as: 'booking',
          attributes: [
            'booking_id',
            'date',
            'status',
            'nb_tickets',
            'created_at',
          ],
        },
      ],
    });

    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
    }

    res.json(oneUser);
  },

  async create(req, res) {
    const dataUser = userSchema.parse(req.body);
    const userCreated = await User.create(dataUser);
    res.status(201).json(userCreated);
  },

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`Nous n'avons pas trouvé cet utilisateur`);
    }

    if (data.password) {
      data.password = Scrypt.hash(data.password);
    }

    const newUser = await oneUser.update(data);
    const newToken = jwt.sign(
      {
        user_id: newUser.user_id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    res.status(200).json({ newUser, newToken });
  },

  async sendResetEmail(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token using uuid
    const resetToken = uuidv4();

    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Password Reset',
      text: `Bonjour,\n
      \n
      Quelqu'un – peut-être vous – demande un nouveau mot de passe pour ZombieLand.\n
      Pour confirmer ce changement de mot de passe, cliquez sur ce lien :\n
      \n
      ${process.env.FRONT_URL}/new-password?token=${resetToken}\n
      \n
      Sinon, merci d'ignorer cet e-mail.\n
      \n
      Note : si le lien ci-dessus ne fonctionne pas, vous pouvez le copier-coller dans la barre d'adresse de votre navigateur internet.\n
      \n
      \n
      Amusez-vous bien !\n
      \n
      De la part de toute la team ZombieLand !`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Reset email sent' });
    });
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = Scrypt.hash(password);

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  },

  async delete(req, res) {
    const id = req.params.id;
    const oneUser = await User.findByPk(id);

    if (!oneUser) {
      throw new Error(`nous n'avons pas trouvé cet utilisateur`);
    }

    await oneUser.destroy();
    res.status(204).send();
  },
};

export default userController;
