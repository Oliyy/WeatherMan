var MongoClient = require('mongodb').MongoClient;
var Api = require('../api.js')

exports.run = (client, message, args) => {
  MongoClient.connect(client.config.mongoURL, function(err, db) {
  if (err) throw err;
  var dbo = db.db("weatherman");
  dbo.collection("users").findOne({ userid: message.author.id }, function(err, result) {
    if (err) throw err;
    console.log(result);
    Api.getWeatherforLocation(result.location, result.preferredUnit).then((resp) => {
//       message.channel.send("some text", {
//     file: "http://link.to/your.file" // Or replace with FileOptions object
// });
      message.channel.send("will do image generate soon, but it's " + resp.main.temp + " in " + resp.name);
    })
    db.close();
  });
});
}
