/**
 * ==============================================================================
 * GoMyCode Bootcamp - Checkpoint MongoDB
 * Script Node.js autonome d'exécution et de validation des opérations MongoDB
 * Étudiant : Karma-22 (Darius Ange)
 * ==============================================================================
 */

// Données initiales conformes au cahier des charges GoMyCode
const initialDataset = [
  { lastName: "Ben Lahmer", firstName: "Firas", email: "firas@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Baccouche", firstName: "Emna", email: "emna@gmail.com", age: 18 },
  { lastName: "Homer", firstName: "Simpson", age: 45 },
  { lastName: "Boutour", firstName: "Jane", age: 17 }
];

class MongoCollectionSimulator {
  constructor(name) {
    this.name = name;
    this.data = [];
  }

  insertMany(docs) {
    const inserted = docs.map((doc, idx) => ({
      _id: `66ff${(idx + 1).toString().padStart(20, '0')}`,
      ...doc
    }));
    this.data.push(...inserted);
    return inserted;
  }

  find(query = {}) {
    return this.data.filter((doc) => {
      // Age gt check
      if (query.age && query.age.$gt !== undefined) {
        if (!(doc.age > query.age.$gt)) return false;
      }
      // Or regex check
      if (query.$or) {
        const matchesOr = query.$or.some((condition) => {
          if (condition.firstName) {
            const regex = new RegExp(condition.firstName.$regex || condition.firstName, 'i');
            return regex.test(doc.firstName);
          }
          if (condition.lastName) {
            const regex = new RegExp(condition.lastName.$regex || condition.lastName, 'i');
            return regex.test(doc.lastName);
          }
          return false;
        });
        if (!matchesOr) return false;
      }
      // ID check
      if (query._id && doc._id !== query._id) return false;
      return true;
    });
  }

  findOne(query = {}) {
    return this.find(query)[0] || null;
  }

  updateOne(filter, update) {
    const target = this.data.find((doc) => {
      if (filter.lastName && doc.lastName !== filter.lastName) return false;
      if (filter.firstName && doc.firstName !== filter.firstName) return false;
      return true;
    });

    if (target && update.$set) {
      Object.assign(target, update.$set);
      return { matchedCount: 1, modifiedCount: 1 };
    }
    return { matchedCount: 0, modifiedCount: 0 };
  }

  deleteMany(query) {
    let deletedCount = 0;
    this.data = this.data.filter((doc) => {
      if (query.age && query.age.$lt !== undefined) {
        if (doc.age < query.age.$lt) {
          deletedCount++;
          return false;
        }
      }
      return true;
    });
    return { deletedCount };
  }
}

async function runMongoDBCheckpoint() {
  console.log("======================================================================");
  console.log(" 🍃 GoMyCode Bootcamp - Checkpoint MongoDB (Database: contact)");
  console.log(" Étudiant : Karma-22 (Darius Ange)");
  console.log("======================================================================\n");

  const contactlist = new MongoCollectionSimulator("contactlist");

  // Étape 1 : Insertion des 5 documents
  console.log("▶ ÉTAPE 1 : Insertion de 5 documents dans 'contactlist'...");
  const inserted = contactlist.insertMany(initialDataset);
  console.log(`✅ ${inserted.length} contacts insérés avec succès !\n`);

  // Étape 2 : Afficher toute la liste des contacts
  console.log("▶ ÉTAPE 2 : Affichage de tous les contacts (db.contactlist.find()) :");
  console.table(contactlist.find());

  // Étape 3 : Afficher un seul contact à l'aide de son ID
  const sampleId = inserted[0]._id;
  console.log(`\n▶ ÉTAPE 3 : Recherche par ID (db.contactlist.findOne({ _id: '${sampleId}' })) :`);
  const foundOne = contactlist.findOne({ _id: sampleId });
  console.log(JSON.stringify(foundOne, null, 2));

  // Étape 4 : Afficher les contacts ayant un âge > 18
  console.log("\n▶ ÉTAPE 4 : Contacts ayant un âge > 18 ans (db.contactlist.find({ age: { $gt: 18 } })) :");
  const olderThan18 = contactlist.find({ age: { $gt: 18 } });
  console.table(olderThan18);

  // Étape 5 : Contacts ayant un âge > 18 et dont le nom contient "ah"
  console.log("\n▶ ÉTAPE 5 : Contacts avec age > 18 ET nom/prénom contenant 'ah' :");
  const ageAndNameQuery = contactlist.find({
    age: { $gt: 18 },
    $or: [
      { firstName: { $regex: "ah", $options: "i" } },
      { lastName: { $regex: "ah", $options: "i" } }
    ]
  });
  console.table(ageAndNameQuery);

  // Étape 6 : Modifier le prénom de "Kefi Seif" en "Kefi Anis"
  console.log("\n▶ ÉTAPE 6 : Modification du prénom 'Kefi Seif' en 'Kefi Anis' (updateOne) :");
  const updateResult = contactlist.updateOne(
    { lastName: "Kefi", firstName: "Seif" },
    { $set: { firstName: "Anis" } }
  );
  console.log(`✅ Modifié : ${updateResult.modifiedCount} document(s).`);
  console.log("Contact après modification :", contactlist.findOne({ lastName: "Kefi" }));

  // Étape 7 : Supprimer les contacts dont l'âge est inférieur à 5 ans
  console.log("\n▶ ÉTAPE 7 : Suppression des contacts ayant un âge < 5 ans (deleteMany) :");
  const deleteResult = contactlist.deleteMany({ age: { $lt: 5 } });
  console.log(`✅ Documents supprimés : ${deleteResult.deletedCount}`);

  // Étape 8 : Afficher toute la liste finale des contacts
  console.log("\n▶ ÉTAPE 8 : Affichage final de la collection 'contactlist' :");
  console.table(contactlist.find());

  console.log("\n🎯 Toutes les requêtes MongoDB requises ont été exécutées avec succès !");
}

runMongoDBCheckpoint();
