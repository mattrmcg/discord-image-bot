const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Moves specified user to specified voice channel')
        .addUserOption(option => option.setName('user')
                .setDescription('The user to move')
                .setRequired(true))
        .addChannelOption(option => option.setName('channel')
                .setDescription('The channel to be moved into')
                .setRequired(true)),
    async execute(interaction) {
        const userArg = interaction.options.getUser('user');
        const channelArg = interaction.options.getChannel('channel');

        if (userArg && channelArg && channelArg.type === 2) {
            const guild = interaction.guild;
            const memberToMove = guild.members.cache.get(userArg.id);

            const requiredRoleName = 'moveable';

            const hasRequiredRole = memberToMove.roles.cache.some(role => role.name === requiredRoleName);

            if (memberToMove && hasRequiredRole) {
                try {
                    await memberToMove.voice.setChannel(channelArg);
                    await interaction.reply(`Successfully moved ${userArg.tag} to ${channelArg.name}.`);
                } catch (error) {
                    console.error(error);
                    await interaction.reply('An error occurred while moving the user.');
                }
            } else {
                await interaction.reply('User not found in the server or does not have the required role.');
            }
        } else {
            await interaction.reply('Invalid user or voice channel provided.')
        }

    },
};