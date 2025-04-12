# Guide Programmeur

# Backend

## Setup (local)

- Démarrer le serveur via Docker Compose
```
docker compose up
```
- Arrêter le serveur via Docker Compose
```
docker compose down
```
On peut query l'API sur localhost:8000

# Frontend

## Installation

### Construire l'extension
Utiliser npm
```
npm run ext-build
```

### Application standalone (legacy)
Utiliser npm
```
npm run start
```

## Installer l'extension sur Chrome
Aller dans la page des extensions du navigateur et utiliser la fonction *load-unpacked* en choisisant le dossier *dist* généré préalablement.
