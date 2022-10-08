const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const User = seq.define("meijiali_user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户名",
  },
  password: {
    type: DataTypes.CHAR(64),
    defaultValue: '',
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
    type: DataTypes.STRING,
    unique: true,
    comment: "用户access_token"
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
    comment: "用户token"
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员,0:不是管理员，1:是管理员",
  },
  gender: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "用户性别,1为男生,2为女生,0为未知",
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: "用户所在城市"
  },
  province: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: "用户所在省城"
  },
  avatarUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: "用户头像"
  },
  is_vip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "是否是发廊，注册的时候输入邀请码就是商店，私人是没有邀请码的"
  }
});

// User.sync({ force: true });
module.exports = User;
