const { updataGoodsError } = require("../consitant/error/error.type");

const cartFarmat = (rules) => {
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
  cartFarmat,
};
