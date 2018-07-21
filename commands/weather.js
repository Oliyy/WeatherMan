var MongoClient = require('mongodb').MongoClient;
var Api = require('../api.js')
var clothing = require('../clothingDecider.js')
var fs = require("fs");
var Canvas = require("canvas");
var canvas = new Canvas(1000, 300, "png");
var g = canvas.getContext("2d"),
grd;

exports.run = (client, message, args) => {
    MongoClient.connect(client.config.mongoURL, function(err, db) {
          if (err) throw err;
          var dbo = db.db("weatherman");
          dbo.collection("users").findOne({
            userid: message.author.id
          }, function(err, result) {
            if (err) throw err;
            console.log(result);
            Api.getWeatherforLocation(result.location, result.preferredUnit).then((resp) => {
              var temperatureRounded = Math.round(parseFloat(resp.main.temp));
              var hi = `Hello ${message.author.username}!`;
              var unitAppend = 'C';
              var string = `Today in ${resp.name} it's ${temperatureRounded}°${unitAppend}`;
              var string2 = clothing.decideClothing(temperatureRounded, result.preferredUnit);

              grd = g.createLinearGradient(0.000, 150.000, 1000.000, 150.000);
              grd.addColorStop(0.00, 'rgba(153, 58, 255, 1.000)');
              grd.addColorStop(1.000, 'rgba(0, 117, 226, 1.000)');
              g.fillStyle = grd;
              g.fillRect(0, 0, 1000, 300);

              g.font = "40px GoogleSansMedium";
              g.fillStyle = "white";
              g.fillText(hi, 30, 80);

              g.font = "54px GoogleSansMedium";
              g.fillStyle = "white";
              g.fillText(string, 30, 160);

              g.font = "35px GoogleSansMedium";
              g.fillStyle = "white";
              g.fillText(string2, 30, 225);

              var buf = canvas.toBuffer();
              fs.writeFileSync(`${message.author.id}.png`, buf);

              setTimeout(function() {
                message.channel.send( {
                  file: `${message.author.id}.png`
                });
              }, 100)
              })
              db.close();
            });
          });
        }
