const Order = require("../model/order_model");

class OrderServer {
  async create(params) {
    return await Order.create(params);
  }

  async findAll(user_id, order_status, pageSize, pageNum) {




    let status = order_status !== 'null' && Object.assign({}, { status: order_status })
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Order.findAndCountAll({
      limit: pageSize * 1,
      offset,
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
      list: rows,
      pageNum,
      pageSize,
    };
  }

  async update(id, status) {
    // return true;
    console.log('update', id, status);
    return await Order.update({ status }, { where: id });
  }
}

module.exports = new OrderServer();
