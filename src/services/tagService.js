const Tag = require("../models/tag");

async function syncTags() {
    await Tag.sync();
}

async function createTag(tagName, tagDescription, username) {
    const tag = await Tag.create({
        name: tagName,
        description: tagDescription,
        username: username,
    });
    return tag;
}

async function fetchTag(tagName) {
    const tag = await Tag.findOne({ where: { name: tagName } });
    if (tag) {
        await tag.increment("usage_count");
    }
    return tag;
}

async function editTag(tagName, tagDescription) {
    const [affectedRows] = await Tag.update(
        { description: tagDescription },
        { where: { name: tagName } },
    );
    return affectedRows > 0;
}

async function displayTag(tagName) {
    const tag = await Tag.findOne({ where: { name: tagName } });
    return tag;
}

async function listTags() {
    const tagList = await Tag.findAll({ attributes: ["name"] });
    const tagString = tagList.map((t) => t.name).join(", ") || "No tags set.";
    return tagString;
}

async function deleteTag(tagName) {
    const rowCount = await Tag.destroy({ where: { name: tagName } });
    return rowCount > 0;
}

module.exports = {
    syncTags,
    createTag,
    fetchTag,
    editTag,
    displayTag,
    listTags,
    deleteTag,
};
