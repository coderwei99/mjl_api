const { getUserInfo } = require("../server/user.server");

const {
  userAlreadyExited,
  userFormateError,
} = require("../consitant/error.type");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  //  验证前端传过来的数据是否合法:用户名或者密码为空
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }

  await next();
};

const verifyUser = async (ctx, next) => {
  //  验证前端传过来的数据是否合理:用户名已经存在
  const { user_name } = ctx.request.body;
  if (await getUserInfo(user_name)) {
    console.error("用户已经存在", ctx.request.body);
    ctx.app.emit("error", userAlreadyExited, ctx);
    return;
  }
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
};
