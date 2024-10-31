---

# MyJobBoard

MyJobBoard est une Progressive Web App (PWA) construite avec Next.js, React, et TypeScript. Elle est optimisée pour offrir une expérience utilisateur fluide et performante sur tous les types d'appareils, qu'ils soient mobiles ou de bureau.

## Sommaire

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Scripts Disponibles](#scripts-disponibles)
4. [Fonctionnalités](#fonctionnalités)
5. [Configuration PWA](#configuration-pwa)
6. [Contribuer](#contribuer)

---

## Prérequis

- Node.js >= 14.x
- pnpm pour la gestion des dépendances

## Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/MhaFADH/exam_pwa
cd exam_pwa
pnpm install
```

## Scripts Disponibles

Voici le scripts le plus important que vous pouvez utiliser pour travailler avec cette application.

### `pnpm dev`

Vérifie le code et détecte les erreurs de style ou de syntaxe.

## Fonctionnalités

- **PWA** : L'application est installable sur les appareils mobiles et accessible hors-ligne grâce au Service Worker.
- **Performances optimisées** : Grâce à Next.js, React et la configuration TypeScript, l'application est rapide et performante.
- **SEO Friendly** : Next.js fournit une excellente gestion du SEO pour améliorer la visibilité de l'application sur les moteurs de recherche.
- **TypeScript** : L'application est construite en TypeScript pour une meilleure sécurité des types et une maintenance facilitée.

## Configuration PWA

Cette application est configurée en tant que PWA pour offrir une expérience native. Voici quelques points sur la configuration :

1. **Manifest Web** : Le fichier `public/manifest.json` contient les informations pour l'installation de l'application.
2. **Service Worker** : Pour gérer le cache.
3. **Optimisation hors-ligne** : Le Service Worker assure que les assets critiques et pages nécessaires sont disponibles même en l'absence de connexion.

## Contribuer

Les contributions sont les bienvenues ! Pour proposer une amélioration ou corriger un bug :

1. Clonez le dépôt.
2. Créez une branche pour votre fonctionnalité : `git checkout -b feature-ma-fonctionnalite`.
3. Faites vos modifications, puis soumettez une pull request.

---
