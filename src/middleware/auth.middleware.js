const jwt = require("jsonwebtoken");

const {
  TokenExpiredError,
  JsonWebTokenError,
} = require("../consitant/error.type");

// 导入秘钥
const { JWT_SECRET } = require("../config/config.default");

const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
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
  await next();
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
  } catch (err) {}
};
module.exports = {
  auth,
  hadAdminPermission,
};
