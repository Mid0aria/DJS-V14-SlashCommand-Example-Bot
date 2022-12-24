const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "stats",
    description: "You learn the statistics of the bot.",
    type: 1,
    options: [],

    run: async (client, interaction) => {
        const { user, guildId, channel } = interaction;

        await interaction.deferReply().catch((err) => {});
        const embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.tag,
                iconURL: client.user.avatarURL(),
            })
            .addFields({
                name: "Total Member:",
                value: `${client.guilds.cache
                    .reduce((a, b) => a + b.memberCount, 0)
                    .toLocaleString()}`,
                inline: true,
            })
            .addFields({
                name: "Total Guilds",
                value: `${client.guilds.cache.size.toLocaleString()}`,
                inline: true,
            })
            .addFields({
                name: "Total Channels",
                value: `${client.channels.cache.size.toLocaleString()}`,
                inline: true,
            })
            .addFields({
                name: "Total Ram",
                value:
                    (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) +
                    " MB",
                inline: true,
            })
            .addFields({
                name: "Music Guilds:",
                value: `${client?.voice?.adapters?.size || 0}`,
                inline: true,
            })
            .addFields({
                name: "Ping",
                value: `${client.ws.ping}`,
                inline: true,
            })
            .setColor("Orange");
        return interaction.followUp({ embeds: [embed] });
    },
};
