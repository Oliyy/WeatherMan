const { MongoClient } = require('mongodb');
const config = require('./config.json')

module.exports = async function getDB() {
  const db = await MongoClient.connect(config.mongoURL)
  .then(client => client.db('weatherman'))
  .catch(e => {
    if (e.message.includes('ECONNREFUSED')) {
      console.log('Failed to connect to database' + e.message);
      process.exit(1);
    }
  })
}
