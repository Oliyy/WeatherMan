const MongoClient = require('mongodb').MongoClient;

exports.run = (client, message, args) => {
  console.log(message.author.id)
  MongoClient.connect(client.config.mongoURL, function(err, db) {
    if (err) throw err
    var weatherman = db.db("weatherman");
    var details = {
      userid: message.author.id,
      location: args[0],
      preferredUnit: args[1]
    };
    weatherman.collection("users").insertOne(details, function(err, res) {
      if (err) throw err;
      console.log("Location updated for user " + message.author.id);
      db.close();
      message.channel.send('Location updated!').catch(console.error);
    });
  });
}
