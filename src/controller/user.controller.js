const jwt = require("jsonwebtoken");

const { createUser, getUserInfo } = require("../server/user.server");
const { userRegisterError } = require("../consitant/error.type");

const { JWT_SECRET } = require("../config/config.default");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      console.log(res);
      ctx.body = {
        code: 0,
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
    const { user_name, password } = ctx.request.body;
    // ctx.body = `hello  ${user_name}`;
    // 获取用户信息
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }
}

module.exports = new UserController();
