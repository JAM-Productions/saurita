const { SlashCommandBuilder } = require("discord.js");
const { editTag } = require("../../services/database");

module.exports = {
    data: new SlashCommandBuilder().setName("edittag").setDescription("Edit a tag."),
    async execute(interaction) {
        const tagName = interaction.options.getString("name");
        const tagDescription = interaction.options.getString("description");

        try {
            const affectedRows = await editTag(tagName, tagDescription);
            if (affectedRows > 0) {
                return interaction.reply(`Tag ${tagName} was edited.`);
            } else {
                return interaction.reply(`Could not find a tag with name ${tagName}.`);
            }
        } catch (error) {
            return interaction.reply("Something went wrong with editing a tag.");
        }
    },
};
