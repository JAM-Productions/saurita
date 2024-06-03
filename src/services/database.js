const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    // SQLite only
    storage: "database.sqlite",
});

const tags = sequelize.define("tags", {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

async function syncTags() {
    await tags.sync();
}

module.exports = {
    syncTags,
};
