const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

const Tag = sequelize.define("tags", {
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

module.exports = Tag;
