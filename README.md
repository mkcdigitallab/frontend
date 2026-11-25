# Forma — plateforme d'apprentissage

Frontend React + Vite en JavaScript, React Router, Fetch natif et CSS personnalisé.

## Installation
```bash
cp .env.example .env
npm install
npm run dev
```
Le frontend doit tourner sur http://localhost:5173 ; configurez le backend avec FRONTEND_URL=http://localhost:5173.

## Écrans
- Accueil éditorial responsive, catalogue public, recherche et pagination
- Détail de cours et inscription
- Inscription / connexion
- Espace formateur et administrateur : mes cours, création
- Espace apprenant : mes inscriptions
- États de chargement, erreurs générales et erreurs par champ

## API et points à vérifier
Les routes de cours et d'inscriptions reprennent le cahier des charges fourni. Le fichier OpenAPI du backend n'est pas présent dans ce dépôt. Il faut encore confirmer dans Swagger les chemins et la réponse d'authentification, les propriétés exactes du POST /courses, les paramètres de recherche et les structures de data. L'interface de création utilise pour l'instant title, description et level comme proposition d'interface : ne pas la considérer comme un contrat garanti.

La page d'accueil utilise des visuels et quelques cours de présentation uniquement si l'API ne retourne aucune donnée. Ces exemples ne sont jamais envoyés au backend.

## Sécurité
Le jeton d'accès est conservé dans localStorage pour cette version de travail. Tout script exécuté sur la même origine peut le lire en cas de faille XSS. En production, privilégier un cookie HttpOnly/Secure/SameSite si le backend le prend en charge. Aucun mot de passe n'est stocké.
