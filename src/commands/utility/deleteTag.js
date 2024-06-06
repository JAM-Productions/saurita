const { SlashCommandBuilder } = require("discord.js");
const { deleteTag } = require("../../services/database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletetag")
        .setDescription("Delete a tag.")
        .addStringOption((option) =>
            option.setName("name").setDescription("The name of the tag").setRequired(true),
        ),
    async execute(interaction) {
        const tagName = interaction.options.getString("name");

        if (!tagName) {
            return interaction.reply("Tag name is missing.");
        }

        try {
            const isDeleted = await deleteTag(tagName);
            if (isDeleted) {
                return interaction.reply(`Tag ${tagName} deleted.`);
            } else {
                return interaction.reply(`Tag ${tagName} does not exist.`);
            }
        } catch (error) {
            console.error(error);
            return interaction.reply("Something went wrong with displaying a tag.");
        }
    },
};
