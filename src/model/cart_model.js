const { DataTypes } = require("sequelize");

const seq = require("../db/seq");
const Goods = require("./goods_model");

const Carts = seq.define("zd_cart", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});

// Carts.sync({ force: true });
Carts.belongsTo(Goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});

module.exports = Carts;
