const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;

        if (message.content === "Hola, Saurita") {
            message
                .react("👋")
                .then(() => message.react("😄"))
                .catch((error) => console.error("Saurita had an reaction Error", error));
        }

        if (message.content.includes("?")) {
            message
                .react("🧐")
                .catch((error) => console.error("Saurita had an reaction Error", error));
        }
    },
};
