const { SlashCommandBuilder } = require("discord.js");
const { createTag } = require("../../services/database");

module.exports = {
    data: new SlashCommandBuilder().setName("addtag").setDescription("Add new tag."),
    async execute(interaction) {
        const tagName = interaction.options.get("name");
        const tagDescription = interaction.options.get("description");

        if (!tagName || !tagDescription) {
            return interaction.reply("Tag name or description is missing.");
        }

        try {
            const tag = await createTag(tagName, tagDescription, interaction.user.username);
            return interaction.reply(`Tag ${tag.name} added.`);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                return interaction.reply("That tag already exists.");
            }
            console.error(error);
            return interaction.reply("Something went wrong with adding a tag.");
        }
    },
};
