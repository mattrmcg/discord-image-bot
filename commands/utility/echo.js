const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos inputted text')
        .addStringOption(option => option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    async execute(interaction) {
        const inputArg = interaction.options.getString('input');
        await interaction.reply(inputArg);
    },
};
