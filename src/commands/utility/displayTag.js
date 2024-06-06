const { SlashCommandBuilder } = require("discord.js");
const { displayTag } = require("../../services/database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("taginfo")
        .setDescription("Display tag info.")
        .addStringOption((option) =>
            option.setName("name").setDescription("The name of the tag").setRequired(true),
        ),
    async execute(interaction) {
        const tagName = interaction.options.getString("name");

        if (!tagName) {
            return interaction.reply("Tag name is missing.");
        }

        try {
            const tag = await displayTag(tagName);
            if (tag) {
                return interaction.reply(
                    `${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`,
                );
            } else {
                return interaction.reply(`Could not find tag: ${tagName}`);
            }
        } catch (error) {
            console.error(error);
            return interaction.reply("Something went wrong with displaying a tag.");
        }
    },
};
