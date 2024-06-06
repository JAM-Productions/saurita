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

async function createTag(tagName, tagDescription, username) {
    const tag = await tags.create({
        name: tagName,
        description: tagDescription,
        username: username,
    });
    console.log(tag);
    return tag;
}

async function fetchTag(tagName) {
    const tag = await tags.findOne({ where: { name: tagName } });
    tag.increment("usage_count");
    return tag;
}

async function editTag(tagName, tagDescription) {
    const affectedRows = await tags.update(
        { description: tagDescription },
        { where: { name: tagName } },
    );
    return affectedRows > 0;
}

async function displayTag(tagName) {
    const tag = await tags.findOne({ where: { name: tagName } });
    return tag;
}

async function listTags() {
    const tagList = await tags.findAll({ attributes: ["name"] });
    const tagString = tagList.map((t) => t.name).join(", ") || "No tags set.";
    return tagString;
}

module.exports = {
    syncTags,
    createTag,
    fetchTag,
    editTag,
    displayTag,
    listTags,
};
