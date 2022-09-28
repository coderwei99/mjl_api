const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const User = seq.define("meijiali_user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名需要是唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  open_id: {
    type: DataTypes.STRING(30),
    unique: true,
    comment: "用户的标识，对当前公众号唯一"
  },
  uid: {
    type: DataTypes.STRING(30),
    unique: true,
    comment: "用户微信id"
  },
  phone: {
    type: DataTypes.CHAR(11),
    unique: true,
    comment: "用户电话号码"
  },
  access_token: {
    type: DataTypes.STRING(30),
    unique: true,
    comment: "用户access_token"
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员,0:不是管理员，1:是管理员",
  },
});

// User.sync({ force: true });
module.exports = User;
