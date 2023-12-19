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
        .setDescription('Generates a DALLE image based on given prompt'),
    async execute(interaction) {

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
        });

        response_url = response.data.data[0].url;

        const replyPayload = new EmbedBuilder().setImage(response_url);

        await interaction.reply({ embeds: [replyPayload] });
    },
};