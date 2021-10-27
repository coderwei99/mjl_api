const Order = require("../model/order_model");

class OrderServer {
  async create(params) {
    return await Order.create(params);
  }

  async findAll(user_id) {
    const { count, rows } = await Order.findAndCountAll({
      attributes: [
        "id",
        "user_id",
        "address_id",
        "goods_info",
        "total",
        "order_number",
        "status",
      ],
      where: {
        user_id,
      },
    });
    return {
      total: count,
      res: rows,
    };
  }

  async update(id, status) {
    // return true;
    console.log(id, status);
    return await Order.update({ status }, { where: { id: 1 } });
  }
}

module.exports = new OrderServer();
