const { REST, Routes } = require('discord.js');
require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const token = process.env.BOT_TOKEN;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

// Grab all commands folders from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the current command folder
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Grab SlashCommandBuilder() output from of each commands data
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// construct instance of REST module and set token
const rest = new REST().setToken(token);

// deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // the put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId, token),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands`);
    } catch (error) {
        console.error(error);
    }
})();


