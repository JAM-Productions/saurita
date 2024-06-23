# Saurita

A discord bot to manage our things like:
- Remember events:
    - Meetings
    - Birthdays
    - Deadlines
- Welcome new people
- React to some text messages
- Provide regular feedback on the status of our projects and statistics
- Play music

## How it works

The bot is built using the [discord.js](https://discord.js.org) library. It uses the [slash commands](https://discord.com/developers/docs/interactions/slash-commands) feature to interact with users.

The diagram is the following:

![diagram](/diagram/diagram.png)

## Requirements

- Node.js (>=`v16.11.0`).

- Download [.env](https://drive.google.com/file/d/1IQ1Uu6AuxVQNMABkRBOZw4OuW-pTEXCX/view?usp=sharing) file and place it in the root directory of the project.

- Yarn (`npm install -g yarn`).

## Installation

```bash
yarn install
```

## Run the bot

```bash
yarn start
```

## Format the code

```bash
yarn format
```

## Check linting

```bash
yarn check-format
```

## Run tests

```bash
yarn test
```

## Deployment

### Only in our Discord server

```bash
yarn deploy-commands-guild
```

### Globally

```bash
yarn deploy-commands-global
```

## Development

### Add a new command

1. Create a new file in the `commands` directory.
2. You must export a function with the following signature:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName("new-command")
        .setDescription("New command description"),,
    execute: async (interaction) => {
        // Your code here
    }
};
```

3. Add a mock test in the `tests` directory.

### Add a new event

1. Create a new file in the `events` directory.
2. You must export a function with the following signature:

```javascript
module.exports = {
    name: 'event-name',
    execute: async (interaction) => {
        // Your code here
    }
};
```
