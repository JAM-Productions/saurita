const { execute } = require("../edittag");
const { editTag } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("EditTag Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully edit a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "newDescription";
                }),
            },
            reply: jest.fn(),
        };

        editTag.mockResolvedValue(1);

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Tag testTag was edited.");
    });

    test("Tag not found", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "newDescription";
                }),
            },
            reply: jest.fn(),
        };

        editTag.mockResolvedValue(0);

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Could not find a tag with name testTag.");
    });

    test("Error while editing a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "newDescription";
                }),
            },
            reply: jest.fn(),
        };

        editTag.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Something went wrong with editing a tag.");
    });
});
