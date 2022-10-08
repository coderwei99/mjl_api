const { DataTypes } = require("sequelize");

const seq = require("../db/seq");
const Goods = require("./goods_model");

const Carts = seq.define("meijiali_cart", {
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
  specification: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "商品规格",
  },
  specification_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "规格的名字"
  },
  count: {
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
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "商品单价",
  }
});

// Carts.sync({ force: true });
Carts.belongsTo(Goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});

module.exports = Carts;
