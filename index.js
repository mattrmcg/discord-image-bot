const fs = require('node:fs'); // loads nodejs file system module
const path = require('node:path'); //  loads nodejs file path module
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); // loads Collection, which is extension of Map from JS
require('dotenv').config();
const token = process.env.BOT_TOKEN;


// new Client instance with {} object passed as argument. intents is an array property.
// Gateway intents are used to specify what events bot will recieve from discord and handle.
// Guilds is events related to servers. Possibly need to add intent to handle message events if not included in Guilds.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection(); // creates Client instance's commands field with collection of commands

const foldersPath = path.join(__dirname, 'commands'); // constructs path to commands directory
const commandFolders = fs.readdirSync(foldersPath); // reads commands directory path, returns an array of all folder names within it

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder); 
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // ^^^ reads current command folder and returns array of names of comman files with .js extensions ^^^

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command  = require(filePath); // load command

        // Set a new item in the collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) { // if "data" and "execute" properties are defined
            client.commands.set(command.data.name, command); // add command-name : command key value pair to client.commands collection
        } else { 
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.login(token);

// event listener for slash commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; // exit block if interaction isn't a ChatInputCommand

    const command = interaction.client.commands.get(interaction.commandName); // get command from client.commands Collection

    if (!command) { // if command is null
        console.error(`No command matching ${interaction.commandName} was found`); // no command found in client.commands
        return; // exits event listener invocation
    }

    try {
        await command.execute(interaction); // trys to execute slash command
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) { // if interaction was replied to or deferred, send error
            await interaction.followUp({ content : 'There was an error while executing this command!', ephemeral : true});
        } else { // else, reply with error
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral : true});
        }
    }
});
