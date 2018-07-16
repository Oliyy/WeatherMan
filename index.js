const Discord = require('discord.js');
const fs = require('file-system';)

const client = new Discord.Client();
const config = require('./config.json');
client.config = config;
