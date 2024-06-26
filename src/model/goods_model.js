const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Goods = seq.define(
  "meijiali_goods",
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格优惠后的价格",
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
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "父级id",
    },
    specification: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "商品规格",
    },
    swiper_image: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "商品轮播图"
    },
    sales: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      comment: "商品销量"
    },
    min_count_elivery: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "商品起送数量"
    },
    is_hot: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "是否热点产品，热点商品展示到首页"
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      comment: "商品原价"
    },
    is_benefit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "是否有优惠"
    },
    retail_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "零售价格",
    }
  },
  {
    paranoid: true,
  }
);
// 创建一张表，创建完毕之后注释，创建一次就够了
// Goods.sync({ force: true });
module.exports = Goods;
