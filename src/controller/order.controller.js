const {
  create,
  findAll,
  update,
  findAllOrderList,
} = require("../server/order.server");

class OrderController {
  // 预下单
  async createOeder(ctx) {
    try {
      const user_id = ctx.state.user.id;
      let {
        goods_info,
        total,
        status,
        order_omment,
        order_address,
        order_contact_phone,
        order_contact_name,
      } = ctx.request.body;
      // 对goods_info 进行序列化
      goods_info = JSON.stringify(goods_info);
      const order_number =
        String(Date.now()) + Math.floor(Math.random() * 1000);
      const res = await create({
        user_id,
        goods_info,
        total,
        order_number,
        status,
        order_omment,
        order_address,
        order_contact_name,
        order_contact_phone,
      });
      ctx.body = {
        code: 200,
        message: "创建订单成功",
        data: res,
      };
    } catch (error) {
      console.error(error, "用户下单error");
    }
  }

  async getUserOrderList(ctx) {
    const order_status = ctx.request.query.order_status;
    const { pageSize = 10, pageNum = 1 } = ctx.request.query;

    const user_id = ctx.state.user.id;
    try {
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
    } catch (error) {
      console.error("用户查看订单error", error);
    }
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
    try {
      const res = await findAllOrderList(ctx.request.body);
      res.list.forEach(item => {
        item.goods_info = JSON.parse(item.goods_info);
      });

      ctx.body = {
        code: 200,
        data: res,
        message: "获取订单列表成功",
      };
    } catch (error) {
      console.error("订单列表 error", error);
    }
  }
}

module.exports = new OrderController();
