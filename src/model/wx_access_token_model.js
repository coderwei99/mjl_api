const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const account_tokens = seq.define("meijiali_account_tokens", {
  accessToken: {
    type: DataTypes.STRING,
    unique: true,
    comment: "用户access_token",
  },
  tokeTime: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
    comment: "到期时间",
  },
});

// account_tokens.sync({ force: true });

module.exports = account_tokens;
