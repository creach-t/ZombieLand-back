import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/router/index.js';
import putAdminDataInReq from './src/middlewares/putAdminDataInReq.js';
import notFoundMiddleware from './src/middlewares/notFound.js';

const app = express();
const server = http.createServer(app);

// Origines autorisées pour CORS : liste séparée par des virgules dans FRONT_URL.
// À défaut (dev), on reste permissif pour ne rien casser localement.
const allowedOrigins = (process.env.FRONT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const corsOrigin = allowedOrigins.length ? allowedOrigins : true;

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
  transports: ['websocket', 'polling'], // Autorise WebSocket et fallback à long-polling si nécessaire
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: corsOrigin, credentials: true }));

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Configure assets routes (static folder)
app.use(express.static('src/public'));
app.set('trust proxy', 1);
// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default value',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 heures
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    },
  })
);

// Middleware pour gérer les messages d'erreur et de succès
app.use((req, res, next) => {
  if (req.session.errorMessage) {
    res.locals.errorMessage = req.session.errorMessage;
    req.session.errorMessage = null;
  } else {
    res.locals.errorMessage = null;
  }

  if (req.session.successMessage) {
    res.locals.successMessage = req.session.successMessage;
    req.session.successMessage = null;
  } else {
    res.locals.successMessage = null;
  }

  next();
});

// Custom middleware
app.use(putAdminDataInReq);
app.use(router);
// Le 404 attrape les routes non matchées, puis le gestionnaire d'erreurs
// (middleware à 4 args) doit être enregistré EN DERNIER pour recevoir les next(error).
app.use(notFoundMiddleware);
app.use(errorHandler);

// Track connected clients
let connectedClients = {};

// Socket.IO connection event
io.on('connection', (socket) => {
  // When a client joins, store their details
  socket.on('joinClient', (userId) => {
    connectedClients[userId] = socket.id;
  });

  // Listen for messages from users
  socket.on('message', (data) => {
    const { sender_id, receiver_id, message } = data;

    // Check if the receiver is connected
    const receiverSocketId = connectedClients[receiver_id];
    if (receiverSocketId) {
      // Send message to the specific client
      io.to(receiverSocketId).emit('message', {
        sender_id,
        message,
        timestamp: new Date(),
      });
    } else {
      console.log(`Receiver ${receiver_id} is not connected`);
    }
  });

  // When the client disconnects
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(connectedClients)) {
      if (socketId === socket.id) {
        delete connectedClients[userId];
        console.log(`User ${userId} disconnected`);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening carefully  at http://localhost:${PORT}`);
});
