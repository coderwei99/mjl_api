const jwt = require("jsonwebtoken");

const {
  TokenExpiredError,
  JsonWebTokenError,
} = require("../consitant/error/error.type");

const {
  appidError
} = require("../consitant/error/user.erorType")

// 导入秘钥
const { JWT_SECRET } = require("../config/config.default");

const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  console.log(authorization, '1');
  const token = authorization.replace("Bearer ", "");
  console.log(token, '2');
  try {
    const res = jwt.verify(token, JWT_SECRET);
    ctx.state.user = res;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        return ctx.app.emit("error", JsonWebTokenError, ctx);
    }
  }

  // await next();
  return true
};

// 验证用户是否为管理员
const hadAdminPermission = async (ctx, next) => {
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
        message: "用户没有权限上传文件",
        result: null,
      };
    }
  } catch (err) { }
};

// 验证小程序的token
const authWxLogin = async (ctx, next) => {
  const { token: _token = "" } = ctx.request.header;
  console.log(_token, '1');
  const token = _token.replace("Bearer ", "");
  console.log(token, '2');
  try {
    const res = jwt.verify(token, JWT_SECRET);
    ctx.state.user = res;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        return ctx.app.emit("error", JsonWebTokenError, ctx);
    }
  }

  // await next();
  return true
};


const diffChannelNo = async (ctx, next) => {
  const { appid } = ctx.request.header
  console.log('appid', appid);
  if (appid === 'wx-mini') {
    // 小程序渠道
    if (authWxLogin(ctx, next)) {
      await next()
    }
  } else if (appid === 'cms') {
    // 后台管理系统
    if (auth(ctx, next)) {
      await next()
    }
  } else {
    // 不允许走到这里  必须根据前端传过来的appid  对token进行鉴权
    ctx.app.emit("error", appidError, ctx);
  }
}



module.exports = {
  auth,
  hadAdminPermission,
  authWxLogin,
  diffChannelNo
};
