# Simulateur territorial

**Version beta – ne pas diffuser.**

**Les données et algorithmes inclus sont des versions de test, et n’ont pas vocation à être représentatifs de la version finale.**

Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous [Licence Ouverte Version 2.0](https://www.etalab.gouv.fr/licence-ouverte-open-licence/)

---

## Développement

- Installation des dépendances :

  ```bash
  npm install
  ```

- Préparation des variables d’environnement :

  ```bash
  cp .env.example .env
  ```

- Démarrage du serveur de développement

  ```bash
  npm run dev
  ```

## Création d’une version de production

- génération des fichiers statiques
  `bash
npm run build
`

                Cette commande génère un répertoire `build` à la racine du projet, qu’il suffit de servir avec un serveur statique.

  Le fichier `nginx.conf` propose une configuration minimale, adaptée à l’environnement Scalingo, et qui s’occupe de gérer

  - la CSP
  - la mise en cache des fichiers immuables

- Prévisualisation de la version de production

  ```bash
  npm run preview
  ```

## Déploiement

- La production doit être déployée à partir de la branche `release`

- Les variables d’environnement suivantes doivent être présentes :

  ```bash
  PUBLIC_ENVIRONMENT=production
  # Mettre à `true` uniquement si le site doit être visible des moteurs de recherche
  PUBLIC_ALLOW_INDEXING=false

  # L’URL du serveur Matomo. Pour l’instance beta.gouv :
  PUBLIC_MATOMO_URL=https://stats.beta.gouv.fr/
  # L’id du site sur le serveur Matomo. Pour l’instance beta.gouv :
  PUBLIC_MATOMO_ID=48
  ```
