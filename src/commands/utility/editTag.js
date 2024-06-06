const { SlashCommandBuilder } = require("discord.js");
const { editTag } = require("../../services/database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("edittag")
        .setDescription("Edit a tag.")
        .addStringOption((option) =>
            option.setName("name").setDescription("The name of the tag").setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("The description of the tag")
                .setRequired(true),
        ),
    async execute(interaction) {
        const tagName = interaction.options.getString("name");
        const tagDescription = interaction.options.getString("description");

        if (!tagName || !tagDescription) {
            return interaction.reply("Tag name or description is missing.");
        }

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
