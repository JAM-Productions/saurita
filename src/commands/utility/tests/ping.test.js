const { MessageActionRow, MessageButton } = require("discord.js");
const { execute } = require("../ping");

describe("Ping Command", () => {
    test('Reply with "Pong!"', async () => {
        const mockInteraction = {
            reply: jest.fn(),
        };

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Pong!");
    });
});
