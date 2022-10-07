const Order = require("../model/order_model");

class OrderServer {
  async create(params) {
    return await Order.create(params);
  }

  async findAll(user_id, order_status) {
    let status = order_status !== 'null' && Object.assign({}, { status: order_status })
    console.log(status, 'stauts-=============================');
    const { count, rows } = await Order.findAndCountAll({
      attributes: [
        "id",
        "user_id",
        "address_id",
        "goods_info",
        "total",
        "order_number",
        "status",
        "createdAt"
      ],
      where: {
        user_id,
        ...status
      },
    });
    return {
      total: count,
      res: { list: rows },
    };
  }

  async update(id, status) {
    // return true;
    console.log('update', id, status);
    return await Order.update({ status }, { where: id });
  }
}

module.exports = new OrderServer();
