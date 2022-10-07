const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Orders = seq.define("meijiali_orders", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "地址id",
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "商品信息",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "总价格",
  },
  order_number: {
    type: DataTypes.CHAR(16),
    allowNull: false,
    comment: "订单编号",
  },
  status: {
    type: DataTypes.TINYINT,
    // allowNull: false,
    defaultValue: 0,
    comment: "订单状态", // 默认值为0， 0===>未支付  1===>已支付  2 ===>已发货  3 ===> 已签收   4 ===>取消
  },
  order_omment: {
    type: DataTypes.STRING(1500),
    defaultValue: '',
    comment: "订单备注",
  },
});

// Orders.sync({ force: true });
module.exports = Orders;
