const { createUser } = require("../server/user.server");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    const res = await createUser(user_name, password);
    console.log(res);
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "hello uses 用户已登录";
  }
}

module.exports = new UserController();
