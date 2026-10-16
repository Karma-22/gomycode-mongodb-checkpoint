/**
 * ==============================================================================
 * GoMyCode Bootcamp - Checkpoint MongoDB
 * Script de commandes pour Shell MongoDB (mongosh / mongo)
 * Base de données : 'contact'
 * Collection : 'contactlist'
 * ==============================================================================
 */

// 1. Sélectionner ou créer la base de données 'contact'
use contact;

// 2. Créer la collection 'contactlist' et insérer les 5 documents demandés
db.contactlist.insertMany([
  {
    lastName: "Ben Lahmer",
    firstName: "Firas",
    email: "firas@gmail.com",
    age: 26
  },
  {
    lastName: "Kefi",
    firstName: "Seif",
    email: "kefi@gmail.com",
    age: 15
  },
  {
    lastName: "Baccouche",
    firstName: "Emna",
    email: "emna@gmail.com",
    age: 18
  },
  {
    lastName: "Homer",
    firstName: "Simpson",
    age: 45
  },
  {
    lastName: "Boutour",
    firstName: "Jane",
    age: 17
  }
]);

// 3. Afficher toute la liste des contacts
print("--- 1. Liste complète des contacts ---");
db.contactlist.find().pretty();

// 4. Afficher un seul contact à l'aide de son ID (ex: premier contact trouvé)
print("--- 2. Un seul contact par ID ---");
const firstContact = db.contactlist.findOne();
if (firstContact) {
  db.contactlist.find({ _id: firstContact._id }).pretty();
}

// 5. Afficher tous les contacts ayant un âge strictement supérieur à 18 ans
print("--- 3. Contacts ayant un âge > 18 ans ---");
db.contactlist.find({ age: { $gt: 18 } }).pretty();

// 6. Afficher tous les contacts ayant un âge > 18 et dont le nom ou prénom contient "ah"
print("--- 4. Contacts ayant un âge > 18 et dont le nom contient 'ah' ---");
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
}).pretty();

// 7. Modifier le prénom du contact "Kefi Seif" en "Kefi Anis"
print("--- 5. Mise à jour de 'Kefi Seif' en 'Kefi Anis' ---");
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
);

// 8. Supprimer les contacts dont l'âge est inférieur à 5 ans
print("--- 6. Suppression des contacts âgés de moins de 5 ans ---");
db.contactlist.deleteMany({ age: { $lt: 5 } });

// 9. Afficher la liste finale de tous les contacts pour vérification
print("--- 7. Liste finale des contacts après modifications ---");
db.contactlist.find().pretty();
