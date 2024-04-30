const { execute } = require('./user');

describe('User Command', () => {
    test('Reply with user information', async () => {
        const mockUser = {
            username: 'MockUser',
        };

        const mockMember = {
            joinedAt: '2024-04-30',
        };

        const mockInteraction = {
            user: mockUser,
            member: mockMember,
            reply: jest.fn(),
        };

        await execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith(`This command was run by ${mockUser.username}, who joined on ${mockMember.joinedAt}.`);
    });
});
