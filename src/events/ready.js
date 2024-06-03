const { Events } = require("discord.js");
const { syncTags } = require("../services/database");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        syncTags();
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
