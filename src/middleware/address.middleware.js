const { updataGoodsError } = require("../consitant/error/error.type");

const addressFarmat = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error(err);
      updataGoodsError.result = err;
      return ctx.app.emit("error", updataGoodsError, ctx);
    }
    await next();
  };
};

module.exports = {
  addressFarmat,
};
