const { ActivityType } = require("discord.js");
const color = require("chalk");

module.exports = (client) => {
    client.user.setStatus("online");
    client.user.setActivity(`${client.guilds.cache.size} Servers`, {
        type: ActivityType.Watching,
    });

    console.log(color.magenta("[Bot-Ready] ") + "Bot ready.");

    console.log(
        color.magenta("[Bot-Ready] ") +
            "Total Member: " +
            color.red(
                client.guilds.cache
                    .reduce((a, b) => a + b.memberCount, 0)
                    .toLocaleString()
            ) +
            " Total Guilds: " +
            color.red(client.guilds.cache.size.toLocaleString()) +
            " Total Channels: " +
            color.red(client.channels.cache.size.toLocaleString()) +
            " Total Ram: " +
            color.red(
                (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)
            ) +
            " MB"
    );
};
