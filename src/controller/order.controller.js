const {
  create,
  findAll,
  update,
  findAllOrderList,
} = require("../server/order.server");

class OrderController {
  // 预下单
  async createOeder(ctx) {
    const user_id = ctx.state.user.id;
    let { address_id, goods_info, total, status, order_omment } =
      ctx.request.body;
    // 对goods_info 进行序列化
    goods_info = JSON.stringify(goods_info);
    const order_number = String(Date.now()) + Math.floor(Math.random() * 1000);
    const res = await create({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
      status,
      order_omment,
    });
    ctx.body = {
      code: 200,
      message: "创建订单成功",
      data: res,
    };
  }

  async getUserOrderList(ctx) {
    const order_status = ctx.request.query.order_status;
    const { pageSize = 10, pageNum = 1 } = ctx.request.query;

    const user_id = ctx.state.user.id;
    const result = await findAll(user_id, order_status, pageSize, pageNum);
    // res.list = JSON.parse(res.list)
    result.list.forEach(item => {
      item.goods_info = JSON.parse(item.goods_info);
    });
    ctx.body = {
      code: 200,
      message: "获取订单列表",
      data: result,
    };
  }

  async updataOrder(ctx) {
    const id = ctx.request.params;
    const status = ctx.request.body.status;
    const res = await update(id, status);
    ctx.body = {
      code: 200,
      message: "更新订单状态成功",
      data: res,
    };
  }

  // 获取所有用户的订单列表
  async getOrderList(ctx) {
    const res = await findAllOrderList(ctx.request.body);
    console.log(res, "---res----");
    res.list.forEach(item => {
      item.goods_info = JSON.parse(item.goods_info);
    });

    ctx.body = {
      code: 200,
      data: res,
      message: "获取订单列表成功",
    };
  }
}

module.exports = new OrderController();
