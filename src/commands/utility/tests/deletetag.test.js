const { execute } = require("../delete-tag");
const { deleteTag } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("DeleteTag Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully delete a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        deleteTag.mockResolvedValue(true);

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Tag testTag deleted.");
    });

    test("Tag does not exist", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        deleteTag.mockResolvedValue(false);

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Tag testTag does not exist.");
    });

    test("Error while deleting a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockReturnValue("testTag"),
            },
            reply: jest.fn(),
        };

        deleteTag.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith(
            "Something went wrong with displaying a tag.",
        );
    });
});
