const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("globalstatistics")
        .setDescription("Replies with GitHub repository Global Statistics"),
        
    async execute(interaction) {
        const owner = "JAM-Productions";
        const repo = interaction.options.getString("repo");

        try {
            const reposResponse = await axios.get(`https://api.github.com/users/${owner}/repos`);
            const reposData = reposResponse.data.map(repo => repo.name);

            let globalstatistics= `**GitHub Repositories for ${owner}:**\n`

            for (const repo of reposData) {
                const repoName = repo.name;

                const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`);
                const repoData = repoResponse.data;

                const pullsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`);
                const pullCount = pullsResponse.data.length;


                globalstatistics += `
                    **${repoData.full_name}**
                        - Description: ${repoData.description || "No description"}
                        - Stars: ${repoData.stargazers_count}
                        - Open Issues: ${repoData.open_issues_count}
                        - Forks: ${repoData.forks_count}
                        - Open Pulls: ${pullCount}
                        - Pulls: https://github.com/${owner}/${repo}/pulls
                `;


            }


            await interaction.reply(globalstatistics);
        } catch (error) {
            console.error("Error fetching repo data:", error);
            await interaction.reply("Error getting repository statistics.");
        }
    },
};
