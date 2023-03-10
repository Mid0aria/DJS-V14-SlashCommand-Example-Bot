const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "You will learn the ping values โโof the bot.",
    type: 1,
    options: [],

    run: async (client, interaction) => {
        const { user, guildId, channel } = interaction;

        interaction.reply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `๐ ***${client.ws.ping}ms***`
                ),
            ],
        });
    },
};
