const {
  createOrUpdate,
  findCartsGoods,
  updataCartsGood,
  removeCartsGoood,
} = require("../server/cart.server");
const {
  updataGoodsError,
  userHasInsql,
  URLParamsError,
} = require("../consitant/error/error.type");

class cartController {
  async addGoods(ctx) {
    // 传递给server层user_id goods_id
    let { goods_id, user_id, specification, count, name, unit_price } = ctx.request.body;
    specification = JSON.stringify(specification)
    // const user_id = ctx.state.user.id;
    const res = await createOrUpdate({ user_id, goods_id, specification, count, name, unit_price });
    try {
      if (res === "1") {
        ctx.app.emit("error", userHasInsql, ctx);
      } else if (res === "2") {
        ctx.app.emit("error", updataGoodsError, ctx);
      } else {
        ctx.body = {
          code: 200,
          message: "添加到购物车成功",
          data: res,
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCartsGoods(ctx) {
    const { pageNumber = 1, pageSize = 10 } = ctx.request.query;
    const user_id = ctx.request.query.user_id

    const res = await findCartsGoods({ pageNumber, pageSize, user_id });

    ctx.body = {
      code: 200,
      message: "购物车信息",
      data: res,
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
        code: 200,
        message: "更新购物车成功",
        data: res,
      };
    } else {
      ctx.app.emit("error", URLParamsError, ctx);
    }
  }

  async remove(ctx) {
    const user_id = ctx.request.body.user_id;
    const goods_id = ctx.request.body.ids;
    const res = await removeCartsGoood({ user_id, goods_id });

    ctx.body = {
      code: 200,
      message: "移除商品成功",
      data: res,
    };
  }
}

module.exports = new cartController();
