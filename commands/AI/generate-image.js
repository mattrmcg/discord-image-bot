const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv').config();


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Generates a DALLE image based on given prompt')
        .addStringOption(option => option.setName('prompt')
                .setDescription('The prompt for the image model. Be as detailed as possible.')
                .setRequired(true)),
    async execute(interaction) {

        const imagePrompt = interaction.options.getString('prompt');

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024",
        });

        response_url = response.data.data[0].url;

        const replyPayload = new EmbedBuilder().setImage(response_url);

        await interaction.reply({ embeds: [replyPayload] });
    },
};