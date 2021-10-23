const { createUser } = require("../server/user.server");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    const res = await createUser(user_name, password);
    console.log(res);
    ctx.body = res;
  }
  async login(ctx, next) {
    ctx.body = "hello uses 用户已登录";
  }
}

module.exports = new UserController();
