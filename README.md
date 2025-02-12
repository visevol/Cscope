# PFE019

**Auteurs** : Eddy ALlard, Félix Lavoie, William Nolin, Alexis Castonguay, Ludovick Martin

**Superviseurs** : Ali, Ouni

Dans le cadre de LOG795 – Projet de fin d’étude

# Quickstart développeurs
## Éxécuter l'application localement
1. Dans une fenêtre de terminal, naviguer vers le folder /api et éxécuter les commandes suivantes.
    ```console
    ~/Cscope/api$ bin/rails db:reset
    ~/Cscope/api$ bin/rails db:prepare
    ~/Cscope/api$ bin/rails server
    ```
    Pour valider le fonctionnement, naviguer vers l'URL du [serveur](http://localhost:3000).

2. Dans une fenêtre de terminal, naviguer vers le folder /api et éxécuter les commandes suivantes.
    ```console
    ~/Cscope/api$ bin/jobs
    ```
    Pour valider le fonctionnement, naviguer vers la [page jobs](http://localhost:3000/jobs).

3. Dans une autre fenêtre de terminal, naviguer vers le folder /frontend et éxécuter les commandes suivantes.
    ```console
    ~/Cscope/frontend$ npm install
    ~/Cscope/frontend$ npm run start
    ```

### Si vous voulez utiliser l'extension, voici la procédure à suivre.

1. Assurez-vous d'avoir bien démarré votre serveur back-end en suivant les étapes 1 et 2 de la section précédente.

2. Dans une fenêtre de terminal, naviguer vers le folder /frontend et éxécuter la commande suivante.
    ```console
    ~/Cscope/frontend$ npm run ext-build
    ```

#### Pour Chrome
3. Naviguer vers chrome://extensions. 
4. Se mettre en mode développeur.
5. Cliquer sur "Chargez l'extension non empaquetée"
6. Sélectionner le dossier /Cscope/frontend/dist et charger.


#### Pour Firefox

TODO.

## Éxécuter l'application dans Docker

TODO.

## Séparation

La séparation des fichiers est claire, backend, frontend et documentation

## Documentation

Un guide utilisateur et de programmeur se trouve dans la documentation ainsi que plusieurs readme dans chacun des sous-dossier

## Edit : option manuelle

Dans /cscope/api, exécutez :
1. docker build -t cscope -f Dockerfile.dev .
2. docker run -p 3000:3000 --name cscope cscope
3. docker exec -it cscope /bin/bash
    3.1 ./bin/rails db:reset && ./bin/rails db:prepare
    3.2 ./bin/jobs

Dans /cscope/frontend, exécutez : 
1. npm run start
