const { execute } = require("./server");

describe("Server Command", () => {
    test("Reply with server information", async () => {
        const mockGuild = {
            name: "Mock Guild",
            memberCount: 10,
        };

        const mockInteraction = {
            guild: mockGuild,
            reply: jest.fn(),
        };

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith(
            `This server is ${mockGuild.name} and has ${mockGuild.memberCount} members.`,
        );
    });
});
