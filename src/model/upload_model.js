const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Upload = seq.define("meijiali_upload", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "图片链接",
  },
  image_key: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "图片key 用户删除",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "图片原名",
  },
});

// Upload.sync({ force: true });
module.exports = Upload;
