const {
  createOrUpdate,
  findCartsGoods,
  updataCartsGood,
} = require("../server/cart.server");
const {
  updataGoodsError,
  userHasInsql,
  URLParamsError,
} = require("../consitant/error.type");

class cartController {
  async addGoods(ctx) {
    // 传递给server层user_id goods_id
    const { goods_id } = ctx.request.body;
    const user_id = ctx.state.user.id;
    const res = await createOrUpdate({ user_id, goods_id });
    try {
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

  async getCartsGoods(ctx) {
    const { pageNumber = 1, pageSize = 10 } = ctx.request.query;
    const user_id = ctx.state.user.id;

    const res = await findCartsGoods({ pageNumber, pageSize, user_id });

    ctx.body = {
      code: 0,
      message: "购物车信息",
      result: res,
    };
  }

  async patchCartsGoods(ctx) {
    const { number, selected } = ctx.request.body;
    if (number === undefined && selected === undefined) {
      updataGoodsError.message = "number和selected不能同时为空";
      ctx.app.emit("error", updataGoodsError, ctx);
    }
    const res = await updataCartsGood({
      ...ctx.request.params,
      ...ctx.request.body,
    });
    if (res) {
      ctx.body = {
        code: 0,
        message: "更新购物车成功",
        result: res,
      };
    } else {
      ctx.app.emit("error", URLParamsError, ctx);
    }
  }
}

module.exports = new cartController();
