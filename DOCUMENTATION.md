# Documentation Complète de BudgetEase

---

## 1. Document de Vision Produit

### 1.1. Présentation Générale
**BudgetEase** est une application de gestion budgétaire personnelle destinée aux collaborateurs du groupe La Poste.  
L’objectif est de fournir aux utilisateurs une plateforme intuitive pour suivre leurs revenus, dépenses et économies, tout en leur offrant des analyses visuelles et des rapports personnalisés pour mieux gérer leur budget.

### 1.2. Objectifs du Produit
- **Suivi financier complet** : Authentification sécurisée, gestion des profils, et enregistrement des transactions financières.
- **Analyse intelligente** : Visualisations dynamiques (tableau de bord, graphiques) et catégorisation intelligente des dépenses.
- **Budgétisation avancée** : Création et suivi des objectifs budgétaires.
- **Rapports personnalisés** : Export et génération de rapports pour un suivi détaillé.
- **Évolutivité** : Prévision d’intégrations futures telles que l’API bancaire et des recommandations basées sur l’IA.

### 1.3. Cible Utilisateur
- **Profils visés** :  
  - **Admin** : Gestion des utilisateurs et des permissions.
  - **User Standard** : Utilisateurs finaux pour le suivi de leur budget.
  - **Consultant/Client** : Utilisateurs externes souhaitant consulter des rapports ou accéder à certaines données.
- **Besoins spécifiques** :  
  - Une solution sécurisée et personnalisable.
  - Une interface intuitive adaptée aux non-techniciens.

### 1.4. Valeur Ajoutée
- **Simplicité et efficacité** dans la gestion quotidienne des finances.
- **Analyses visuelles** pour une meilleure compréhension des flux financiers.
- **Flexibilité** permettant d’ajouter des fonctionnalités avancées à terme (API bancaires, IA, etc.).

---

## 2. Backlog Produit Priorisé (Structure Agile en 5 Sprints de 3 Semaines)

Backlog Produit BudgetEase
Epic 1 : Suivi Financier et Gestion de Profil
Objectif :
Permettre aux utilisateurs (collaborateurs, administrateurs et consultants) de s’authentifier, de gérer leur profil et d’enregistrer l’ensemble de leurs transactions financières dans un environnement sécurisé.

US1-1 : Authentification et Gestion de Profil
Rôle : Utilisateur standard
Description :
En tant qu’utilisateur, je souhaite m’inscrire, me connecter et gérer mon profil de manière sécurisée afin de protéger mes données personnelles et accéder à mes informations financières.
Priorité : Élevée
Critères d’acceptation :
L’interface d’inscription et de connexion est claire et accessible.
Les informations sensibles (mots de passe, données personnelles) sont chiffrées.
La récupération de mot de passe est disponible.
Option d’authentification à deux facteurs pour renforcer la sécurité.
Tâches :
Conception UI/UX : Créer les maquettes pour les pages d’inscription, connexion et gestion de profil.
Développement API : Implémenter l’API d’authentification avec chiffrement.
Mécanisme de récupération : Développer la fonctionnalité de récupération de mot de passe.
2FA : Intégrer et tester l’authentification à deux facteurs.
US1-2 : Gestion des Transactions Financières
Rôle : Utilisateur standard
Description :
En tant qu’utilisateur, je souhaite ajouter, modifier et supprimer mes transactions (revenus/dépenses) pour suivre précisément l’évolution de mon budget.
Priorité : Élevée
Critères d’acceptation :
Possibilité d’enregistrer une transaction avec les champs : date, montant, catégorie et description.
Opérations CRUD (Create, Read, Update, Delete) fonctionnelles sur chaque transaction.
Système de catégorisation automatique basé sur des règles préétablies.
Mise à jour instantanée des données dans le tableau de bord.
Tâches :
Formulaire transaction : Concevoir et développer l’interface de saisie.
Backend CRUD : Implémenter les opérations CRUD pour les transactions.
Algorithme de catégorisation : Développer et intégrer l’algorithme d’affectation automatique des catégories.
Tests fonctionnels : Valider l’ensemble du processus par des tests unitaires et d’intégration.
Epic 2 : Analyse et Visualisation des Données Financières
Objectif :
Offrir une vue globale et interactive des finances de l’utilisateur grâce à des tableaux de bord et des visualisations dynamiques.

US2-1 : Tableau de Bord Interactif
Rôle : Utilisateur standard
Description :
En tant qu’utilisateur, je souhaite consulter un tableau de bord intuitif affichant des indicateurs clés et des graphiques interactifs afin d’avoir une vision synthétique de ma situation financière.
Priorité : Élevée
Critères d’acceptation :
Affichage des indicateurs essentiels : revenus totaux, dépenses totales, solde.
Graphiques interactifs permettant le filtrage par dates et catégories.
Actualisation en temps réel suite aux modifications des transactions.
Interface simple et adaptée aux utilisateurs non-techniciens.
Tâches :
Design UI/UX : Réaliser les maquettes du tableau de bord.
Intégration graphique : Sélectionner et intégrer une librairie de graphiques (ex. Chart.js ou D3.js).
Fonctionnalité de filtre : Développer le système de filtrage des données.
Tests d’usabilité : Organiser des sessions de test pour garantir la simplicité d’utilisation.
US2-2 : Budgétisation Avancée et Suivi d’Objectifs
Rôle : Utilisateur standard
Description :
En tant qu’utilisateur, je souhaite définir des objectifs budgétaires et suivre leur progression afin de mieux contrôler mes dépenses et mon épargne.
Priorité : Moyenne
Critères d’acceptation :
Possibilité de créer des objectifs avec un montant cible et une période définie.
Visualisation d’un indicateur de progression pour chaque objectif.
Notifications en cas de dépassement ou d’approche des limites définies.
Intégration cohérente des objectifs avec le reste des transactions.
Tâches :
Interface objectifs : Concevoir l’interface de création et de suivi des objectifs.
Logique de calcul : Développer la logique pour le calcul de la progression.
Système de notifications : Mettre en place des notifications (email et in-app).
Tests d’intégration : Vérifier la cohérence avec les données des transactions.
Epic 3 : Génération de Rapports et Export
Objectif :
Permettre aux utilisateurs, notamment les consultants et clients, de générer et exporter des rapports personnalisés pour une analyse détaillée de leurs finances.

US3-1 : Génération et Export de Rapports
Rôle : Consultant / Client
Description :
En tant que consultant ou client, je souhaite générer des rapports détaillés et les exporter (PDF, CSV) afin d’analyser mes données financières sur une période définie.
Priorité : Moyenne
Critères d’acceptation :
Possibilité de sélectionner une plage de dates et des filtres (catégories, type de transaction).
Rapport reflétant fidèlement les données saisies.
Formats d’export disponibles : PDF et CSV, avec un formatage conforme aux besoins.
Option de téléchargement direct ou d’envoi par email.
Tâches :
Interface rapport : Concevoir l’interface de configuration des rapports.
Développement export : Implémenter les fonctionnalités d’export en PDF et CSV.
Intégration filtres : Développer la logique de sélection de plage et de filtres.
Tests de qualité : Vérifier l’exactitude et la mise en forme des rapports.
Epic 4 : Administration et Gestion des Utilisateurs
Objectif :
Offrir aux administrateurs une interface dédiée pour la gestion des profils et des permissions, garantissant ainsi la sécurité et la traçabilité des actions.

US4-1 : Administration et Gestion des Utilisateurs
Rôle : Administrateur
Description :
En tant qu’administrateur, je souhaite gérer les profils utilisateurs et attribuer des permissions spécifiques afin d’assurer la sécurité de l’application et la conformité aux politiques internes.
Priorité : Moyenne
Critères d’acceptation :
Visualisation complète des profils utilisateurs et de leurs statuts.
Possibilité d’attribuer et de révoquer des rôles et permissions (ex. accès aux rapports, modification des données).
Enregistrement des actions administratives dans des logs d’audit pour garantir la traçabilité.
Interface admin intuitive et sécurisée.
Tâches :
Conception interface admin : Créer les maquettes pour la gestion des utilisateurs.
Gestion rôles/permissions : Implémenter le système de rôles et permissions.
Mécanisme de logs : Développer la fonctionnalité de logs d’audit.
Tests de sécurité : Effectuer des tests pour valider l’accès et la sécurité de l’interface.
Epic 5 : Préparation à l’Évolutivité et Intégrations Futures
Objectif :
Concevoir une architecture modulaire permettant l’ajout futur d’API bancaires et de fonctionnalités d’intelligence artificielle pour des recommandations personnalisées.

US5-1 : Préparation à l’Évolutivité
Rôle : Product Owner / Développeur
Description :
En tant que product owner, je souhaite que l’architecture de l’application soit modulaire et prête pour des intégrations futures (API bancaires, IA) afin de supporter une montée en charge et d’enrichir les fonctionnalités.
Priorité : Moyenne
Critères d’acceptation :
Architecture modulaire avec des API claires et documentées.
Documentation technique complète pour faciliter les intégrations futures.
Mise en place de endpoints "stub" pour l’API bancaire et l’IA.
Scalabilité prouvée par des tests de charge et de résilience.
Tâches :
Analyse architecturale : Réaliser un audit de l’architecture existante et proposer des améliorations modulaires.
Endpoints futurs : Développer des endpoints stubs pour préparer les intégrations.
Documentation technique : Rédiger une documentation détaillée destinée aux développeurs externes.
Tests de scalabilité : Effectuer des tests de charge pour garantir la résilience du système.

-----------------------------------------------------------------------------------------

---

## 3. Document d'Architecture Détaillé

### 3.1. Aperçu Général
L'architecture de **BudgetEase** repose sur une approche full-stack moderne, combinant :
- **Frontend** : Application React utilisant Material-UI (MUI) pour une interface réactive et ergonomique.
- **Backend** : Application Spring Boot gérant les API REST, la logique métier et l'authentification.
- **Base de Données** : PostgreSQL pour stocker les données des utilisateurs, transactions, et objectifs budgétaires.
- **Déploiement Cloud** :
  - **Heroku** pour le backend.
  - **Netlify** pour le frontend.
  - **AWS RDS** pour la base de données.

### 3.2. Composants Clés et Flux de Données

- **Frontend (React + MUI)**  
  - Gère l'interface utilisateur et les interactions.
  - Utilise Redux pour la gestion de l'état (sélecteurs, slices pour transactions, auth, etc.).
  - Communique avec le backend via des requêtes HTTP (Axios).

- **Backend (Spring Boot)**  
  - Expose des API REST pour l’authentification, la gestion des transactions, la gestion des utilisateurs, et les rapports.
  - Implémente l'authentification via JWT et gère les rôles (admin, user, consultant).
  - Traite la logique de business et interagit avec la base de données.

- **Base de Données (PostgreSQL)**  
  - Contient les tables `users`, `transactions`, `budgets`, etc.
  - Utilise JPA/Hibernate pour la persistance des données.

- **Authentification & Sécurité**  
  - Utilisation de JWT pour sécuriser les API.
  - Vérification des permissions via des middlewares côté backend.
  - Gestion conditionnelle de l’interface utilisateur selon les rôles (ex. affichage des actions admin).

- **External Services et Évolutivité**  
  - Préparation pour intégrer des API bancaires.
  - Prévision d’un module d’IA pour des recommandations financières.
  - Services d’email pour vérification et notifications.

> **Diagramme d'Architecture Technique**  
> *(Voir le diagramme d’architecture généré précédemment ou créé via un outil comme Draw.io pour une représentation visuelle détaillée.)*

---

## 4. Documentations Techniques

### 4.1. Modèles de Base de Données

#### 4.1.1. Modèle Utilisateur (`User`)
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    private String role; // "admin", "user", "client"
    
    private LocalDate createdAt;
    // Getters et setters...
}

4.2. Documentation de l'État (State Management)
Redux est utilisé pour gérer l'état global du frontend.
Slices : authSlice, transactionsSlice, etc.
Sélecteurs : selectTotalIncome, selectTotalExpense, selectBalance, etc.
Actions : Mise à jour des transactions, authentification, et gestion des profils.

### Exemple d'utilisation dans HomeScreen.tsx (voir code fourni dans la documentation initiale).

### 4.3. API Endpoints et Documentation Technique
Endpoints d’Authentification
POST /api/auth/register

Request Body:
json
Copier
Modifier
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}
Response:
json
Copier
Modifier
{
  "message": "Utilisateur enregistré avec succès"
}
POST /api/auth/login

Request Body:
json
Copier
Modifier
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
json
Copier
Modifier
{
  "token": "jwt-token",
  "user": {
    "id": 2,
    "username": "john_doe",
    "role": "user"
  }
}
Endpoints des Transactions
GET /api/transactions

Response:
json
Copier
Modifier
[
  {
    "id": 1,
    "type": "income",
    "amount": 1000,
    "description": "Salaire",
    "category": "Revenus",
    "date": "2025-01-15"
  },
  {
    "id": 2,
    "type": "expense",
    "amount": 200,
    "description": "Courses",
    "category": "Alimentation",
    "date": "2025-01-16"
  }
]
POST /api/transactions

Request Body:
json
Copier
Modifier
{
  "type": "expense",
  "amount": 150,
  "description": "Essence",
  "category": "Transport",
  "date": "2025-01-18"
}
Response:
json
Copier
Modifier
{
  "message": "Transaction ajoutée avec succès"
}
PUT /api/transactions/{id} et DELETE /api/transactions/{id} suivent des schémas similaires pour la mise à jour et la suppression.

Endpoints des Rapports et Budgets
GET /api/reports
Description : Génère un rapport financier.
POST /api/budgets
Description : Crée et met à jour des objectifs budgétaires.
5. Guide Utilisateur
5.1. Démarrage et Connexion
Inscription :
Rendez-vous sur la page d'inscription, remplissez vos informations (nom, email, mot de passe, rôle) et validez.
Connexion :
Utilisez votre email et mot de passe pour accéder à l’application.
5.2. Utilisation du Tableau de Bord
Vue d'ensemble :
Le tableau de bord affiche votre solde actuel, les revenus et les dépenses totaux sous forme de graphiques (pie chart, barres statistiques).
Navigation :
Une barre latérale permet d’accéder aux sections : Dashboard, Transactions, Budgets, et Paramètres.
Export :
Vous pouvez exporter vos rapports en cliquant sur le bouton "Exporter les rapports".
5.3. Gestion des Transactions
Ajouter une Transaction :
Accédez à la page "Ajouter une Transaction", remplissez le formulaire (type, montant, description, catégorie, date) et validez.
Liste des Transactions :
Visualisez, modifiez ou supprimez vos transactions via la page "Toutes les Transactions" (utilisation d’un DataGrid).
5.4. Administration et Gestion des Profils
Pour l’Administrateur :
Accédez au tableau de bord administrateur pour gérer les utilisateurs (création, modification des rôles, suppression).
Les actions de modification sont enregistrées automatiquement via des composants éditables.
6. Documentation API (Détail des Endpoints)
6.1. Authentification
POST /api/auth/register

Description : Enregistre un nouvel utilisateur.
Exemple de Request/Response : Voir la section 4.3.
POST /api/auth/login

Description : Authentifie un utilisateur et retourne un token JWT.
Exemple : Voir la section 4.3.
6.2. Transactions
GET, POST, PUT, DELETE sur /api/transactions
Description : CRUD complet pour la gestion des transactions.
Exemple : Voir la section 4.3.
6.3. Rapports et Budgets
GET /api/reports
Description : Génère un rapport financier.
POST /api/budgets
Description : Crée et met à jour des objectifs budgétaires.
Des exemples de code (React + Axios) sont intégrés dans le frontend pour consommer ces endpoints.

7. Procédures de Déploiement
7.1. Déploiement du Backend (Spring Boot sur Heroku)
Préparation :
Configurez les variables d’environnement (DATABASE_URL, JWT_SECRET, etc.).
Build & Déploiement :
Compilez l’application : mvn clean package
Déployez sur Heroku via Git ou via la CLI Heroku.
Configuration Post-Déploiement :
Assurez-vous que la connexion à AWS RDS est opérationnelle.
7.2. Déploiement du Frontend (React sur Netlify)
Build du Frontend :
Exécutez npm run build pour générer les fichiers statiques.
Déploiement :
Connectez Netlify à votre dépôt GitHub et déployez automatiquement.
Configuration :
Configurez les redirections et les variables d’environnement nécessaires.
7.3. Base de Données (PostgreSQL sur AWS RDS)
Créez une instance PostgreSQL sur AWS RDS.
Configurez les paramètres de sécurité et connectez Heroku à AWS RDS via les variables d’environnement.
8. Prompts Pertinents Utilisés
Prompt Initial pour Documentation Complète
"Créer une documentation complète pour BudgetEase incluant la vision produit, backlog, architecture, API, guide utilisateur et procédures de déploiement."
Prompt pour l'Architecture Diagram
"Créer un diagramme d'architecture technique détaillé pour BudgetEase, incluant frontend, backend, base de données, authentification JWT et services cloud."
Prompt pour le Backlog Agile
"Générer un backlog produit priorisé avec des user stories détaillées, réparties en 5 sprints de 3 semaines, avec story points et priorités."
Prompt pour l’Optimisation du Code React
"Afficher les extraits de code React pour HomeScreen, TransactionsList et AdminDashboard afin d’associer chaque user story à une tâche technique correspondante."
Fin de la Documentation
Cette documentation offre une vue complète et détaillée de BudgetEase et sert de référence pour le développement, la gestion du produit et la planification des sprints Agile.

