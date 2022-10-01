const { create, findAll, update } = require("../server/order.server");

class OrderController {
  // 预下单
  async createOeder(ctx) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = String(Date.now()) + Math.floor(Math.random() * 1000)
    const res = await create({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 200,
      message: "创建订单成功",
      data: res,
    };
  }

  async getOrderList(ctx) {
    const user_id = ctx.state.user.id;
    const { res, total } = await findAll(user_id);
    ctx.body = {
      code: 200,
      message: "获取订单列表",
      total,
      data: res,
    };
  }

  async updataOrder(ctx) {
    const id = ctx.request.params;
    const status = ctx.request.body.status;
    const res = await update(id, status);
    ctx.body = {
      code: 200,
      message: "更新订单成功",
      data: res,
    };
  }
}

module.exports = new OrderController();
