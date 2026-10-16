# 🍃 MongoDB Checkpoint - Base de Données Contact (GoMyCode)

[![MongoDB](https://img.shields.io/badge/MongoDB-CRUD_Queries-47A248?logo=mongodb&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?logo=nodedotjs&logoColor=white)]()
[![Tests](https://img.shields.io/badge/Tests-5%2F5%20Passing-22c55e.svg)]()
[![Student](https://img.shields.io/badge/Student-Karma--22%20(Darius%20Ange)-blue.svg)]()

> Projet réalisé dans le cadre du **Bootcamp Full Stack Software Developer de GoMyCode**.  
> Ce checkpoint met en pratique la création d'une base de données MongoDB, l'insertion de collections de documents, les requêtes de recherche avec opérateurs de comparaison (`$gt`), logiques (`$or`) et expressions régulières, ainsi que les opérations de mise à jour (`updateOne`) et de suppression (`deleteMany`).

---

## 📋 Table des Matières

- [Objectifs du Checkpoint](#-objectifs-du-checkpoint)
- [Cahier des Charges & Validation](#-cahier-des-charges--validation)
- [Script Shell MongoDB (queries.js)](#-script-shell-mongodb-queriesjs)
- [Exécution & Tests](#-exécution--tests)
- [Auteur](#-auteur)

---

## 🎯 Objectifs du Checkpoint

1. Créer une base de données nommée **`contact`**.
2. Créer une collection nommée **`contactlist`**.
3. Insérer les 5 contacts requis :
   - `{ lastName: "Ben Lahmer", firstName: "Firas", email: "firas@gmail.com", age: 26 }`
   - `{ lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 }`
   - `{ lastName: "Baccouche", firstName: "Emna", email: "emna@gmail.com", age: 18 }`
   - `{ lastName: "Homer", firstName: "Simpson", age: 45 }`
   - `{ lastName: "Boutour", firstName: "Jane", age: 17 }`
4. Réaliser les requêtes d'interrogation et de manipulation :
   - Afficher tous les contacts (`find()`).
   - Afficher un contact par ID (`findOne()`).
   - Afficher les contacts ayant un âge `> 18`.
   - Afficher les contacts ayant un âge `> 18` et dont le nom ou prénom contient `"ah"`.
   - Modifier le prénom de `"Kefi Seif"` en `"Kefi Anis"`.
   - Supprimer les contacts dont l'âge est `< 5`.
   - Afficher la liste finale pour validation.

---

## ✅ Cahier des Charges & Validation

| Requête Demandée | Commande MongoDB | Statut |
| :--- | :--- | :---: |
| **Création DB & Collection** | `use contact;` / `db.contactlist.insertMany(...)` | ✅ Validé |
| **Afficher tous les contacts** | `db.contactlist.find()` | ✅ Validé |
| **Afficher un contact par ID** | `db.contactlist.findOne({ _id: ObjectId(...) })` | ✅ Validé |
| **Contacts âge > 18** | `db.contactlist.find({ age: { $gt: 18 } })` | ✅ Validé |
| **Contacts âge > 18 et nom avec "ah"** | `db.contactlist.find({ age: { $gt: 18 }, $or: [...] })` | ✅ Validé |
| **Modifier Kefi Seif en Anis** | `db.contactlist.updateOne({ lastName: "Kefi", firstName: "Seif" }, { $set: { firstName: "Anis" } })` | ✅ Validé |
| **Supprimer contacts < 5 ans** | `db.contactlist.deleteMany({ age: { $lt: 5 } })` | ✅ Validé |
| **Affichage final** | `db.contactlist.find()` | ✅ Validé |

---

## 💻 Script Shell MongoDB (`queries.js`)

```javascript
// Sélectionner la DB
use contact;

// Insertion
db.contactlist.insertMany([
  { lastName: "Ben Lahmer", firstName: "Firas", email: "firas@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Baccouche", firstName: "Emna", email: "emna@gmail.com", age: 18 },
  { lastName: "Homer", firstName: "Simpson", age: 45 },
  { lastName: "Boutour", firstName: "Jane", age: 17 }
]);

// 1. Tous les contacts
db.contactlist.find();

// 2. Par ID
db.contactlist.findOne({ _id: ObjectId("...") });

// 3. Âge > 18
db.contactlist.find({ age: { $gt: 18 } });

// 4. Âge > 18 et nom contenant "ah"
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
});

// 5. Mise à jour de prénom
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
);

// 6. Suppression âge < 5
db.contactlist.deleteMany({ age: { $lt: 5 } });

// 7. Affichage final
db.contactlist.find();
```

---

## 🚀 Exécution & Tests

```bash
# 1. Cloner le projet
git clone https://github.com/Karma-22/gomycode-mongodb-checkpoint.git
cd gomycode-mongodb-checkpoint

# 2. Exécuter le script de démonstration
npm start

# 3. Lancer la suite de tests automatisée
npm test
```

---

## 👨‍💻 Auteur

- **Darius Ange (Karma-22)**  
- Profil GitHub : [https://github.com/Karma-22](https://github.com/Karma-22)  
- GoMyCode Full Stack Software Developer Bootcamp
