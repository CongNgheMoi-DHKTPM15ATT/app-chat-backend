const user = require('./src/seeder/userSeeder');

async function dbseed() {
  await user();
}