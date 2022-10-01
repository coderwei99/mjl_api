const seq = require("../db/seq");
const { DataTypes } = require("sequelize");

const address = seq.define("meijiali_address", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "收货人id",
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "收货人姓名",
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: "收货人电话",
  },
  // address: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   comment: "收货人地址",
  // },
  province: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: "收货人所在省"
  },
  city: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: "收货人所在市"
  },
  district: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: "收货人所在区"
  },
  detail: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: "收货人详细地址"
  },
  post_code: {
    type: DataTypes.INTEGER(10),
    comment: "邮编"
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "是否默认地址：0不是（默认值），1：是",
  },
  city_province: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: "收货人的省会+城市+区/镇" //有的地方是没有区的 1. 广东省广州市白云区 2. 广东省东莞市企石镇
  }
});

// address.sync({ force: true });

module.exports = address;
