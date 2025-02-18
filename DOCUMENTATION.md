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

Le backlog est organisé en **user stories détaillées** avec une estimation en story points (1, 2, 3, 5, 8) et réparti sur 5 sprints pour le MVP, avec des fonctionnalités évolutives pour les sprints ultérieurs.

### Tableau du Backlog

| Sprint | User Story                                                                                                                                     | Priorité    | Story Points | Statut  |
|--------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------|--------------|---------|
| 1      | **En tant qu'utilisateur, je souhaite m'inscrire et me connecter** afin d'accéder à l'application.                                             | Must Have   | 5            | À faire |
| 1      | **En tant qu'utilisateur, je veux consulter mon profil** pour visualiser mes informations personnelles.                                         | Must Have   | 3            | À faire |
| 1      | **En tant qu'administrateur, je veux gérer les rôles (admin, user, consultant)** pour attribuer des permissions spécifiques.                      | Must Have   | 8            | À faire |
| 2      | **En tant qu'utilisateur, je veux ajouter une transaction** (revenus/dépenses) afin de suivre mes flux financiers.                               | Must Have   | 5            | À faire |
| 2      | **En tant qu'utilisateur, je veux voir la liste de mes transactions** pour avoir un historique détaillé.                                         | Must Have   | 3            | À faire |
| 2      | **En tant qu'utilisateur, je veux catégoriser mes transactions** automatiquement ou manuellement pour une meilleure analyse.                     | Must Have   | 5            | À faire |
| 3      | **En tant qu'utilisateur, je veux visualiser un tableau de bord analytique** présentant mon solde, mes revenus et mes dépenses sous forme de graphiques. | Must Have   | 8            | À faire |
| 3      | **En tant qu'utilisateur, je veux exporter des rapports personnalisés** afin de partager mes données financières.                                 | Should Have | 5            | À faire |
| 4      | **En tant qu'utilisateur, je veux définir des objectifs budgétaires** pour mieux contrôler mes dépenses.                                         | Should Have | 5            | À faire |
| 4      | **En tant qu'administrateur, je veux gérer les utilisateurs** (ajout, modification, suppression) pour maintenir la base de données à jour.         | Must Have   | 8            | À faire |
| 5      | **En tant qu'utilisateur, je veux recevoir des notifications ou alertes** lorsque je dépasse mon budget.                                          | Should Have | 3            | À faire |
| 5      | **(Sprint Futur)** **En tant qu'utilisateur, je veux intégrer des API bancaires** pour importer automatiquement mes transactions.                | Could Have  | 8            | Backlog |
| 5      | **(Sprint Futur)** **En tant qu'utilisateur, je veux des recommandations basées sur l'IA** pour optimiser mes finances.                           | Could Have  | 8            | Backlog |

> **Remarque :** Les user stories avec la mention "(Sprint Futur)" sont des fonctionnalités avancées prévues après le MVP.


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

