const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Codes = seq.define(
  "meijiali_code",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "邀请码",
    },
    shop_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "是否有效",
    },
  }
);
// 创建一张表，创建完毕之后注释，创建一次就够了
// Codes.sync({ force: true });

module.exports = Codes;
