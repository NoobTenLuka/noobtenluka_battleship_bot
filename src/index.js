import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config()
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // TODO: Handle commands
});

client.login('token');