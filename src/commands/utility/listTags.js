const { SlashCommandBuilder } = require("discord.js");
const { listTags } = require("../../services/tagService");

module.exports = {
    data: new SlashCommandBuilder().setName("showtags").setDescription("Show all tags."),
    async execute(interaction) {
        try {
            const tags = await listTags();
            return interaction.reply(`List of tags: ${tags}`);
        } catch (error) {
            console.error(error);
            return interaction.reply("Something went wrong with listing tags.");
        }
    },
};
