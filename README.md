# Pet Owners Association

Application web de gestion des propriétaires d'animaux et de leurs compagnons.

## 🌐 Application en ligne

L'application est déployée et accessible à l'adresse : [https://petowners-assc.netlify.app/]

## 🚀 Fonctionnalités

### Gestion des Propriétaires
- Liste paginée des propriétaires d'animaux
- Détails complets de chaque propriétaire :
  - Nom et prénom
  - Coordonnées (email, téléphone)
  - Liste des animaux associés

### Gestion des Animaux
- Liste paginée des animaux
- Détails complets de chaque animal :
  - Nom
  - Espèce
  - Race
  - Date de naissance
  - Poids
  - Propriétaire associé

## 🛠️ Technologies utilisées

- **Frontend** :
  - Next.js
  - TypeScript
  - Apollo Client
  - CSS Modules
  - GraphQL

- **Backend** :
  - GraphQL
  - mySQL
  - NestJs

## 🏗️ Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

## 📝 Structure du projet

```
├── pages/              # Pages de l'application
├── src/
│   ├── api/           # Requêtes GraphQL
│   ├── components/    # Composants React
│   │   ├── shared/    # Composants partagés
│   │   └── ui/        # Composants UI
│   └── styles/        # Styles CSS
└── public/            # Fichiers statiques
```

## 🔄 Fonctionnement

L'application utilise une architecture client-serveur avec GraphQL :

1. Le frontend Next.js gère l'interface utilisateur et les interactions
2. Les requêtes GraphQL sont utilisées pour communiquer avec le backend
3. La pagination est gérée côté client pour une meilleure expérience utilisateur
4. Les données sont mises en cache par Apollo Client.

