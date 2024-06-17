const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("statistics")
        .setDescription("Replies with GitHub repository statistics")
        .addStringOption((option) =>
            option.setName("repo").setDescription("The name of the repository").setRequired(true),
        ),
    async execute(interaction) {
        const owner = "JAM-Productions";
        const repo = interaction.options.getString("repo");

        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
            const repoData = response.data;

            const pullsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`);
            const pullCount = pullsResponse.data.length;

            const statistics = `
                **${repoData.full_name}**
                - Description: ${repoData.description || "No description"}
                - Stars: ${repoData.stargazers_count}
                - Open Issues: ${repoData.open_issues_count}
                - Forks: ${repoData.forks_count}
                - Open Pulls: ${pullCount}
                - Pulls: https://github.com/${owner}/${repo}/pulls
            `;

            await interaction.reply(statistics);
        } catch (error) {
            console.error("Error fetching repo data:", error);
            await interaction.reply("Hubo un error obteniendo las estadísticas del repositorio.");
        }
    },
};
