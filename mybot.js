const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const fs = require("fs")

client.login(config.token);

client.on('ready', () => {
  console.log('I am ready!');
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(config.prefix)) return;

  // Exit if any bot
  if (message.author.bot) return;

  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.sendMessage("pong!");
  } else
  if (message.content.startsWith(config.prefix + "foo")) {
    message.channel.sendMessage("bar!");
  }

  if(message.content.startsWith(config.prefix + "prefix")){
    // get arguments for the command, as: !prefix +
    let args = message.content.split(" ").slice(1);

    // change the configuration in memory
    config.prefix = args[0];

    // Now we have to save the file.
    fs.writeFile('./config.json', JSON.stringify(config), (err) => {
      if(err) console.error(err)});

      //prints message to chat and console
      message.channel.sendMessage("Prefix Changed to " + config.prefix);
      console.log("Prefix Changed to " + config.prefix);
  }
});
