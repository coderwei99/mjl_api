const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updataById,
  findUserOrCreate
} = require("../server/user.server");
const {
  userRegisterError,
  modifyPasswordfail,
} = require("../consitant/error/error.type");

const { JWT_SECRET } = require("../config/config.default");

const { getWxUserInfo, getAccessToken } = require("../request/module/user")

// 对openid进行加密函数
const { toCryptOpenid } = require("../middleware/user.middleware")

// 导入对用户个人信息解密函数
const { changeEncryptedData } = require("../utils/changeEncryptedData")
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      console.log(res);
      ctx.body = {
        code: 200,
        message: "用户注册成功",
        result: {
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // ctx.body = `hello  ${user_name}`;
    // 获取用户信息
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 200,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }
  async changePassword(ctx, next) {
    // 1. 拿到用户输入的密码
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    const user_name = ctx.request.body.user_name;
    const id_admin = ctx.request.body.is_admin;
    console.log(id, password, id_admin);
    // 2. 操作数据库
    try {
      if (await updataById({ id, password, user_name, id_admin })) {
        // console.log("正常情况");
        ctx.body = {
          code: 200,
          message: "修改密码成功",
          result: null,
        };
      } else {
        // console.log("不正常情况");
        // code:'10007'
        ctx.app.emit("error", modifyPasswordfail, ctx);
      }
    } catch (err) {
      console.log(err);
    }
    // 3. 返回结果
  }

  async wxLogin(ctx, next) {
    const body = ctx.request.body
    // const accessToken = await getAccessToken()
    // 发送请求换取openid
    const res = await getWxUserInfo(body.code)
    const token = jwt.sign({ openid: res.openid }, JWT_SECRET, { expiresIn: "90d" })
    res.token = token
    // // 对前端给的用户加密信息进行解密
    const userInfo = await changeEncryptedData(res.session_key, body.encryptedData, body.iv)
    console.log(userInfo);
    // 去数据库查询有无这个openid
    const _res = await findUserOrCreate(res, userInfo)



    ctx.body = {
      code: 200,
      message: "登录成功",
      data: {
        ..._res,
        token,
      }
    }
    console.log(body);
  }

}

module.exports = new UserController();

