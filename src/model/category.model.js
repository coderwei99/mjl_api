const seq = require("../db/seq");
const { DataTypes } = require("sequelize");

const category = seq.define("meijiali_category", {
  parent_id: {
    type: DataTypes.INTEGER,
    comment: "父级id,如果没有代表为一级菜单",
    defaultValue: 0
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "分类名字",
    unique: true
  },
});

// category.sync({ force: true });

module.exports = category;
