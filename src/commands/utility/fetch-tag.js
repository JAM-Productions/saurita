const { SlashCommandBuilder } = require("discord.js");
const { fetchTag } = require("../../services/tagService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fetchtag")
        .setDescription("Fetch tag.")
        .addStringOption((option) =>
            option.setName("name").setDescription("The name of the tag").setRequired(true),
        ),
    async execute(interaction) {
        const tagName = interaction.options.getString("name");

        if (!tagName) {
            return interaction.reply("Tag name is missing.");
        }

        try {
            const tag = await fetchTag(tagName);
            return interaction.reply(tag.get("description") ?? "No description");
        } catch (error) {
            console.error(error);
            return interaction.reply(`Could not find tag: ${tagName}`);
        }
    },
};
