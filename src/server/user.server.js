const User = require("../model/user_model");

const { discardCode } = require("./code.server")
class UserServer {
  // 创建一条用户数据
  async createUser(user_name, password, appId) {
    const res = await User.create({ user_name, password, appId });
    return res.dataValues;
  }

  // 查找用户
  async getUserInfo({ id, user_name, password, is_anmin }) {
    console.log('----------------------------------------', { id, user_name, password, is_anmin });
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_anmin && Object.assign(whereOpt, { is_anmin });
    console.log(User);
    const res = await User.findOne({
      // attributes: ["id", "password", "is_admin", "user_name"],
      where: whereOpt,
    });
    console.log(res, '---------------------');
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
  async findUserOrCreate({ openid, token, accessToken }, { nickName, gender, city, province, country, avatarUrl }, invitation_code, appId) {
    try {
      let res = await User.findOne({ where: { open_id: openid } })

      // 如果有invitation_code 就说明用户是发廊用户 invitation_code是否正确在用户输入的时候就判断了 所以这里只有两种可能 一种是空字符串 另一种是正确的邀请码
      let is_vip = false
      if (invitation_code) {
        is_vip = true
      }
      if (!res) {
        // 如果用户用了邀请码 这里需要废弃这个code
        if (is_vip) {
          await discardCode(invitation_code)
        }
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
          is_vip,
          appId
        })
      }
      return res.dataValues
    } catch (error) {
      console.log('error-=-------------------=========================', error);
    }
  }
}

module.exports = new UserServer();
