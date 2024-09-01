import 'dotenv/config';
import express from 'express';
import http from 'http';
import session from 'express-session';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/router/index.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('./public'));

app.use(router);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('joinAdmin', () => {
    socket.join('admin');
    console.log('Admin rejoint');
  });

  socket.on('joinClient', () => {
    socket.join('client');
    console.log('Client rejoint');
  });

  socket.on('message', (message) => {
    console.log('Message reçu :', message);

    io.emit('message', message);

    io.to('admin').emit('newMessageNotification', 'Nouveau message reçu');
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
