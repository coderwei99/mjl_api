const seq = require("../db/seq");
const { DataTypes } = require("sequelize");

const address = seq.define("zd_address", {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "收货人地址",
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "是否默认地址：0不是（默认值），1：是",
  },
});

// address.sync({ force: true });

module.exports = address;
