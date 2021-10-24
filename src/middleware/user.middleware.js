const bcrypt = require("bcryptjs");

const { getUserInfo } = require("../server/user.server");

const {
  userAlreadyExited,
  userFormateError,
  userRegisterError,
  userDoesNotExited,
  userLoginError,
  invalidPassword,
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

  try {
    const res = await getUserInfo({ user_name });
    console.log(res, "12312312");
    if (res) {
      console.error("用户名已存在", { user_name });
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

// 对密码进行加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next();
};

const verifyLogin = async (ctx, next) => {
  // 1.判断用户是否存在
  const { user_name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户不存在", { user_name });
      ctx.app.emit("error", userDoesNotExited, ctx);
      return;
    }
    // 2.密码是否正确
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }

  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
