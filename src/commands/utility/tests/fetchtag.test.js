const { execute } = require("../fetchtag");
const { fetchTag } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("FetchTag Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully fetch a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        fetchTag.mockResolvedValue({ get: jest.fn().mockReturnValue("testDescription") });

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("testDescription");
    });

    test("Tag not found", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        fetchTag.mockResolvedValue({ get: jest.fn().mockReturnValue(null) });

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("No description");
    });

    test("Error while fetching a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        fetchTag.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Could not find tag: testTag");
    });
});
