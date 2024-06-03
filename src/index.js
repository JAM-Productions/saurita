const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { loadCommands, loadEvents } = require("./helpers");

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(process.env.DISCORD_TOKEN);
