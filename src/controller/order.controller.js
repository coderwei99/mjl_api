const { create, findAll, update } = require("../server/order.server");

class OrderController {
  async createOeder(ctx) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = "DW" + Date.now();
    const res = await create({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 0,
      message: "创建订单成功",
      result: res,
    };
  }

  async getOrderList(ctx) {
    const user_id = ctx.state.user.id;
    const { res, total } = await findAll(user_id);
    ctx.body = {
      code: 0,
      message: "获取商品列表",
      total,
      result: res,
    };
  }

  async updataOrder(ctx) {
    const id = ctx.request.params;
    const status = ctx.request.body.status;
    const res = await update(id, status);
    ctx.body = {
      code: 0,
      message: "更新商品成功",
      result: res,
    };
  }
}

module.exports = new OrderController();
