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

  // 更新数据库 ----> 根据id查询到数据  可以修改用户名、密码、是否为管理员
  async updataById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });
    const res = await User.update(newUser, { where: whereOpt });
    console.log(res);
    return res[0] > 0 ? true : false;
  }

  // 查询用户 查询到返回用户信息 查询不到就新建
  async findUserOrCreate({ openid, token, accessToken }, { nickName, gender, city, province, country, avatarUrl }) {
    try {
      let res = await User.findOne({ where: { open_id: openid } })
      console.log(res, 'res');
      console.log('--------------------------------------------------');
      console.log(accessToken);
      console.log('--------------------------------------------------');

      if (!res) {
        // 新用户 缓存数据到数据库
        res = await User.create({
          user_name: nickName,
          gender: gender,
          open_id: openid,
          city: city,
          province: province,
          country: country,
          avatarUrl: avatarUrl,
          uid: '1010' + String(new Date().getTime()).slice(0, 7),
          phone: "",
          access_token: accessToken,
          token,
        })
      }
      return res.dataValues
    } catch (error) {
      console.log('error-=-------------------=========================', error);
    }
  }
}

module.exports = new UserServer();
