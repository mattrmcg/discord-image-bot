require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.BOT_TOKEN;

// new Client instance with {} object passed as argument. intents is an array property.
// Gateway intents are used to specify what events bot will recieve from discord and handle.
// Guilds is events related to servers. Possibly need to add intent to handle message events if not included in Guilds.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
