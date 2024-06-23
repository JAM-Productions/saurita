const { execute } = require("../displaytag");
const { displayTag } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("DisplayTag Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully display a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        displayTag.mockResolvedValue({
            username: "testUser",
            createdAt: "2024-01-01",
            usage_count: 5,
        });

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("testTag was created by testUser at 2024-01-01 and has been used 5 times.");
    });

    test("Tag not found", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        displayTag.mockResolvedValue(null);

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Could not find tag: testTag");
    });

    test("Error while displaying a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        displayTag.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Something went wrong with displaying a tag.");
    });
});
