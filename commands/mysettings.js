const MongoClient = require('mongodb').MongoClient;

exports.run = (client, message, args) => {
  client.user.setUsername("Weather");
  MongoClient.connect(client.config.mongoURL, function(err, db) {
    if (err) throw err
    var weatherman = db.db("weatherman");
    var details = {
      userid: message.author.id
    };
    weatherman.collection("users").findOne({
      userid: message.author.id
    }, function(err, result) {
      if (err) throw err;
      if (result === null) {
          message.channel.send('Uh oh! It seems you have not set your location yet!\n\nYou can set it like this: `!set <location> <units>` ').catch(console.error);
      } else {
        message.channel.send({embed: {
          color: 4077878,
          description: `currentlocation: ${result.location} units: ${result.preferredUnit}`
        }});
      }
      db.close();
    });
  })
}
