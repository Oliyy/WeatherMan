const MongoClient = require('mongodb').MongoClient;

exports.run = (client, message, args) => {
  MongoClient.connect(client.config.mongoURL, function(err, db) {
    if (err) throw err
    var weatherman = db.db("weatherman");
    var details = {
      userid: message.author.id,
      location: args[0],
      preferredUnit: args[1]
    };
    weatherman.collection("users").findOne({
      userid: message.author.id
    }, function(err, result) {
      if (err) throw err;
      if (result === null) {
        weatherman.collection("users").insertOne(details, function(err, res) {
          if (err) throw err;
          console.log("Location updated for user " + message.author.id);

          message.channel.send('Location set!').catch(console.error);
        });
      } else {
        var query = {
          userid: message.author.id
        };
        var updatedLocation = {
          $set: {
            location: args[0],
            preferredUnit: args[1]
          }
        };
        weatherman.collection("users").updateOne(query, updatedLocation, function(err, res) {
          if (err) throw err;
          console.log("Location updated for user " + message.author.id);

          message.channel.send('Location updated!').catch(console.error);
        })
      }
      db.close();
    });

  })
}
