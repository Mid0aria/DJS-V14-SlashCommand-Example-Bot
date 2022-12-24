const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");
const color = require("chalk");
const fs = require("fs");
const config = require("./config.json");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
    ],
    allowedMentions: {
        parse: ["users"],
    },
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
    ],
    retryLimit: 3,
});

global.client = client;
client.commands = global.commands = [];
client.emotes = config.emoji;

fs.readdirSync("./interactioncommands").forEach((f) => {
    if (!f.endsWith(".js")) return;

    const props = require(`./interactioncommands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: props.type,
    });

    console.log(
        color.magenta(`[Command Loader] `) +
            color.blue(`${props.name} `) +
            "is loaded."
    );
});

fs.readdirSync("./events").forEach((e) => {
    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args);
    });

    console.log(
        color.magenta(`[Event Loader] `) + color.blue(`${name} `) + "is loaded."
    );
});

client
    .login(config.token)
    .then((app) => {
        console.log(
            color.magenta(`[Bot] `) +
                "Token login " +
                color.green("successful.")
        );
    })
    .catch((app) => {
        console.log(
            color.magenta(`[Bot] `) + "Token login " + color.red("failed.")
        );
    });
