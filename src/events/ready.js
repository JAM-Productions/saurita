const { Events } = require("discord.js");
const { syncTags } = require("../services/tagService");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        syncTags();
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
