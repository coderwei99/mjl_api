class UserController {
  async register(ctx, next) {
    ctx.body = "hello uses 用户已注册";
  }
  async login(ctx, next) {
    ctx.body = "hello uses 用户已登录";
  }
}

module.exports = new UserController();
