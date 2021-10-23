const { createUser, getUserInfo } = require("../server/user.server");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    //  验证前端传过来的数据是否合法:用户名或者密码为空
    if (!user_name || !password) {
      console.error("用户名或密码为空", ctx.request.body);
      (ctx.status = 400),
        (ctx.body = {
          code: "10001",
          message: "用户名或密码为空",
          result: null,
        });
      return;
    }

    //  验证前端传过来的数据是否合理:用户名已经存在
    if (getUserInfo(user_name)) {
      console.error("用户已经存在", ctx.request.body);
      ctx.status = 409;
      ctx.body = {
        code: "10002",
        message: "用户已经存在",
        result: null,
      };
      return;
    }

    const res = await createUser(user_name, password);
    console.log(res);
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        user_name: res.user_name,
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "hello uses 用户已登录";
  }
}

module.exports = new UserController();
