const { createOrUpdate } = require("../server/cart.server");
const { updataGoodsError, userHasInsql } = require("../consitant/error.type");

class cartController {
  async addGoods(ctx) {
    // 传递给server层user_id goods_id
    const { goods_id, user_id } = ctx.request.body;
    const res = await createOrUpdate({ user_id, goods_id });
    try {
      // if (res) {
      //   ctx.body = {
      //     code: 0,
      //     message: "添加商品成功",
      //     result: res,
      //   };
      // } else {
      //   // return ctx.app.emit("error");
      //   console.log("错误");
      // }
      if (res === "1") {
        ctx.app.emit("error", userHasInsql, ctx);
      } else if (res === "2") {
        ctx.app.emit("error", updataGoodsError, ctx);
      } else {
        ctx.body = {
          code: 0,
          message: "添加到购物车成功",
          result: res,
        };
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new cartController();
