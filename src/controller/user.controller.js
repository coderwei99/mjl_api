const { createUser } = require("../server/user.server");
const { userRegisterError } = require("../consitant/error.type");
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
    ctx.body = "hello uses 用户已登录";
  }
}

module.exports = new UserController();
