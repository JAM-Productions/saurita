const { execute } = require("../listtags");
const { listTags } = require("../../../services/tagService");

jest.mock("../../../services/tagService");

describe("ListTags Command", () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });

    test("Successfully list tags", async () => {
        const mockInteraction = {
            reply: jest.fn(),
        };

        listTags.mockResolvedValue("tag1, tag2, tag3");

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("List of tags: tag1, tag2, tag3");
    });

    test("Error while listing tags", async () => {
        const mockInteraction = {
            reply: jest.fn(),
        };

        listTags.mockRejectedValue(new Error("Unexpected error"));

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Something went wrong with listing tags.");
    });
});
