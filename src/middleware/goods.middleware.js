const { formatParamsError } = require("../consitant/error/error.type");

const goodsFarmat = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {
        type: "string",

        required: true,
      },
      goods_price: {
        type: "number",
        required: true,
      },
      goods_num: {
        type: "number",
        required: true,
      },
      goods_img: {
        type: "string",
        required: true,
      },
    });
  } catch (err) {
    formatParamsError.result = err;
    return ctx.app.emit("error", formatParamsError, ctx);
  }

  await next();
};

module.exports = {
  goodsFarmat,
};
