import test from 'node:test';
import assert from 'node:assert';

const initialDataset = [
  { lastName: "Ben Lahmer", firstName: "Firas", email: "firas@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Baccouche", firstName: "Emna", email: "emna@gmail.com", age: 18 },
  { lastName: "Homer", firstName: "Simpson", age: 45 },
  { lastName: "Boutour", firstName: "Jane", age: 17 }
];

test('MongoDB Checkpoint Queries Suite', async (t) => {
  let contacts = initialDataset.map((c, i) => ({ _id: `id_${i + 1}`, ...c }));

  await t.test('1. Total contacts inserted should equal 5', () => {
    assert.strictEqual(contacts.length, 5);
  });

  await t.test('2. Query age > 18 should return Ben Lahmer (26) and Homer (45)', () => {
    const older = contacts.filter((c) => c.age > 18);
    assert.strictEqual(older.length, 2);
    assert.ok(older.some((c) => c.lastName === 'Ben Lahmer'));
    assert.ok(older.some((c) => c.lastName === 'Homer'));
  });

  await t.test('3. Query age > 18 AND name containing "ah" should return only Ben Lahmer', () => {
    const match = contacts.filter((c) => {
      const hasAh = /ah/i.test(c.firstName) || /ah/i.test(c.lastName);
      return c.age > 18 && hasAh;
    });
    assert.strictEqual(match.length, 1);
    assert.strictEqual(match[0].lastName, 'Ben Lahmer');
  });

  await t.test('4. Update Kefi Seif to Kefi Anis should alter firstName correctly', () => {
    const kefi = contacts.find((c) => c.lastName === 'Kefi' && c.firstName === 'Seif');
    assert.ok(kefi);
    kefi.firstName = 'Anis';
    assert.strictEqual(kefi.firstName, 'Anis');
  });

  await t.test('5. Delete contacts with age < 5 should keep all contacts intact (none < 5)', () => {
    const beforeCount = contacts.length;
    contacts = contacts.filter((c) => !(c.age < 5));
    assert.strictEqual(contacts.length, beforeCount);
  });
});
