FROM node:18-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier les fichiers source
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3000

# Commande par défaut (sera remplacée par celle du docker-compose)
CMD ["npm", "run", "dev"]
