# News App

Code de départ pour mettre en place une connexion entre un serveur NodeJS et une page web statique.

## Configuration

Etapes à suivre :

- Créer un fichier `.env` a la racine du serveur en suivant le modèle `.env.dist`.
- Configurer son app avec ces infos :

`PORT=3888
COOKIE_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
MONGO_URL=mongodb://127.0.0.1:27017/user_news_api
COOKIE_NAME=user_news_api
DATABASE_NAME=user_news_api
NEWS_API_KEY=2fdd5376bdfe4c56929d6f07c5a2e4ac`

- Installer les dépendances avec la commande `npm i`
- Lancer le serveur avec la commande `npm start`
