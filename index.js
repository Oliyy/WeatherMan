const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require('file-system';)

const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
