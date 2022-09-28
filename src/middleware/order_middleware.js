const { orderParamsError } = require("../consitant/error/error.type");

const ordersFarmat = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error(err);
      orderParamsError.result = err;
      return ctx.app.emit("error", orderParamsError, ctx);
    }
    await next();
  };
};

module.exports = {
  ordersFarmat,
};
