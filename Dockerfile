# Utiliser une image Node.js légère
FROM node:16-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
