const { updataGoodsError } = require("../consitant/error.type");

const cartFarmat = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: {
        type: "number",
      },
    });
  } catch (err) {
    console.error(err);
    updataGoodsError.result = err;
    return ctx.app.emit("error", updataGoodsError, ctx);
  }
  await next();
};

module.exports = {
  cartFarmat,
};
