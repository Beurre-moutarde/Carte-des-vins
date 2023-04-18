# Carte-des-vins

## Objectifs

1. Concevoir la base de données: concevoir une base de données pour stocker les informations sur les vins. Utiliser MongoDB pour stocker les données en utilisant le schéma Mongoose. Vous pouvez créer des collections pour les régions et les vins.

npm packages: mongooseDB

User: Models each has a name, mail, password( doit contenir au moins un chiffre, au moins une lettre minuscule, au moins une lettre majuscule, au moins un caractère spécial, ne doit pas contenir d'espace, au moins 8 caractères) avis, notes
Vin: Models each has vin_name, millesime, producteur, users notes and user avis
Region: Models each has a name, list des vins

2. Créer une API: créer une API pour accéder aux données stockées dans la base de données. Vous pouvez utiliser Node.js et Express.js pour créer l'API.

npm packages: express, Insomnia

userRoutes: userController: Get/Create/Update/Delete,
vinRoutes: vinController: Get/Create/Update/Delete,
regionRoutes: regionController: Get/Create/Update/Delete,

3. Concevoir l'interface utilisateur: utiliser React pour concevoir l'interface utilisateur de l'application. Vous pouvez utiliser une bibliothèque de cartographie interactive comme Mapbox pour afficher la carte de France.

npm packages: React, webpack

4. Intégrer l'API et l'interface utilisateur: intégrer l'API que vous avez créée avec l'interface utilisateur de l'application. Vous pouvez utiliser des bibliothèques telles que Axios pour faire des appels API à partir de React.

npm packages: axios

5. Déployer l'application: enfin, vous devez déployer l'application sur un serveur. Vous pouvez utiliser des services tels que Heroku ou AWS pour déployer l'application.

host server: Heroku



