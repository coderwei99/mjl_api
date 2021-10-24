const User = require("../model/user_model");

class UserServer {
  // 创建一条用户数据
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }

  // 查找用户
  async getUserInfo({ id, user_name, password, is_anmin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_anmin && Object.assign(whereOpt, { is_anmin });
    console.log(whereOpt);
    const res = await User.findOne({
      // attributes: ["id", "password", "is_admin", "user_name"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
}

module.exports = new UserServer();
