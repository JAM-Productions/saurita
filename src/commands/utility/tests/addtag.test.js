const { execute } = require("../addtag");
const { createTag } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("AddTag Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully add a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "testDescription";
                }),
            },
            user: { username: "testUser" },
            reply: jest.fn(),
        };

        createTag.mockResolvedValue({ name: "testTag" });

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Tag testTag added.");
    });

    test("Tag already exists", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "testDescription";
                }),
            },
            user: { username: "testUser" },
            reply: jest.fn(),
        };

        createTag.mockRejectedValue({ name: "SequelizeUniqueConstraintError" });

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("That tag already exists.");
    });

    test("Missing tag name or description", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return null;
                }),
            },
            reply: jest.fn(),
        };

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Tag name or description is missing.");
    });

    test("Error while adding a tag", async () => {
        const mockInteraction = {
            options: {
                getString: jest.fn().mockImplementation((name) => {
                    return name === "name" ? "testTag" : "testDescription";
                }),
            },
            user: { username: "testUser" },
            reply: jest.fn(),
        };

        createTag.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Something went wrong with adding a tag.");
    });
});
