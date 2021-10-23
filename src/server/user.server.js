const User = require("../model/user_model");

class UserServer {
  async createUser(user_name, password) {
    // return "写入数据库成功";
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }
}

module.exports = new UserServer();
