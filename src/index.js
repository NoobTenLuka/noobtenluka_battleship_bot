const fs = require("fs");
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const TokenNotFoundError = require('./errors/token_not_found.error');
const { prefix } = require("./bot.config");

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  // Check that the message starts with the prefix and is not from a bot. If not, simply ignore the message.
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  // Get the command, which is the first bit of text and the args which are split by a space
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  // Check that the command exists
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // Try executing the command
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

// Authenticate with the token. If the token is not set, throw a token not found exception
if(!process.env.DISCORD_TOKEN) throw new TokenNotFoundError()

client.login(process.env.DISCORD_TOKEN);