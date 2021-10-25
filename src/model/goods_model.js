const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Goods = seq.define(
  "zd_goods",
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格",
    },
    goods_num: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "商品数量",
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片的URL",
    },
  },
  {
    paranoid: true,
  }
);
// 创建一张表，创建完毕之后注释，创建一次就够了
// Goods.sync({ force: true });
module.exports = Goods;
