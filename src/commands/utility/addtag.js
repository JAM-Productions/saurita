const { SlashCommandBuilder } = require("discord.js");
const { createTag } = require("../../services/tagService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addtag")
        .setDescription("Add new tag.")
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
