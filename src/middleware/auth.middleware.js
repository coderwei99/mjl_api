const jwt = require("jsonwebtoken");

const {
  TokenExpiredError,
  JsonWebTokenError,
  TokenAllowNullError,
} = require("../consitant/error/error.type");

const { appidError } = require("../consitant/error/user.erorType");

// 导入秘钥
const { JWT_SECRET } = require("../config/config.default");

const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  console.log(authorization, "1");
  const token = authorization.replace("Bearer ", "");
  console.log(token, "2");
  try {
    const res = jwt.verify(token, JWT_SECRET);
    console.log(res, "res");
    ctx.state.user = res;
  } catch (err) {
    console.log("err", err.name);
    return { type: "err", error: err };
  }

  // await next();
  return { type: "success" };
};

// 验证用户是否为管理员
const hadAdminPermission = async (ctx, next) => {
  console.log(ctx.state, "---------------");
  const { is_admin } = ctx.state.user;
  try {
    // console.log(ctx.state.user);
    // console.log(id);
    if (is_admin) {
      await next();
    } else {
      // console.log("不是管理员");
      ctx.body = {
        code: "10222",
        message: "用户没有权限",
        result: null,
      };
    }
  } catch (err) {}
};

// 验证小程序的token
const authWxLogin = async (ctx, next) => {
  const { token: _token = "" } = ctx.request.header;
  console.log(_token, "1");
  const token = _token.replace("Bearer ", "");
  console.log(token, "2");
  try {
    const res = jwt.verify(token, JWT_SECRET);
    // const {} = ctx.header
    console.log(
      ctx.header,
      "header----------------------------------------------------------------------------------------------"
    );
    ctx.state.user = { id: ctx.header.user_id };
  } catch (err) {
    return { type: "err", error: err };
  }

  // await next();
  return { type: "success" };
};

const diffChannelNo = async (ctx, next) => {
  const { appid } = ctx.request.header;
  console.log("appid", appid);
  if (appid === "wx-mini") {
    // 小程序渠道
    const result = await authWxLogin(ctx, next);
    if (result.type !== "err") {
      await next();
    } else {
      switch (result.error.name) {
        case "TokenExpiredError":
          return ctx.app.emit("error", TokenExpiredError, ctx);
        case "JsonWebTokenError":
          return ctx.app.emit("error", JsonWebTokenError, ctx);
        default:
          return ctx.app.emit("error", TokenAllowNullError, ctx);
      }
    }
    return;
  } else if (appid === "cms") {
    // 后台管理系统
    console.log(await auth(ctx, next));
    const result = await auth(ctx, next);
    if (result.type !== "err") {
      await next();
    } else {
      // 判断token是那种异常
      switch (result.error.name) {
        case "TokenExpiredError":
          return ctx.app.emit("error", TokenExpiredError, ctx);
        case "JsonWebTokenError":
          return ctx.app.emit("error", JsonWebTokenError, ctx);
        default:
          return ctx.app.emit("error", TokenAllowNullError, ctx);
      }
    }
  } else {
    // 不允许走到这里  必须根据前端传过来的appid  对token进行鉴权
    ctx.app.emit("error", appidError, ctx);
  }
};

module.exports = {
  auth,
  hadAdminPermission,
  authWxLogin,
  diffChannelNo,
};
