const Order = require("../model/order_model");
const User = require("../model/user_model");
const Address = require("../model/address_model");
class OrderServer {
  async create(params) {
    return await Order.create(params);
  }

  async findAll(user_id, order_status, pageSize, pageNum) {
    let status =
      order_status !== "null" && Object.assign({}, { status: order_status });
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Order.findAndCountAll({
      limit: pageSize * 1,
      offset,
      attributes: [
        "id",
        "user_id",
        "goods_info",
        "total",
        "order_number",
        "status",
        "createdAt",
      ],
      where: {
        user_id,
        ...status,
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
    console.log("update", id, status);
    return await Order.update({ status }, { where: id });
  }

  async getUserInfoAndAddressInfo(user_id, address_id) {
    const userInfo = await User.findOne({
      where: {
        id: user_id,
      },
      raw: true,
    });
    const addressInfo = await Address.findOne({
      where: {
        id: address_id,
      },
      raw: true,
    });
    console.log("------------");
    return {
      userInfo,
      addressInfo,
    };
  }

  // 获取所有用户订单列表
  async findAllOrderList(params) {
    const { pageSize = 10, pageNum = 1, ...arg } = params;
    // 模糊查询
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Order.findAndCountAll({
      limit: pageSize * 1,
      offset,
      raw: true,
      order: [["createdAt", "DESC"]],
    });
    let i = 0;
    while (i < rows.length) {
      rows[i].userInfo = await User.findOne({
        where: { id: rows[i].user_id },
        attributes: [
          "id",
          "user_name",
          "phone",
          "avatarUrl",
          "is_vip",
          "user_shop_name",
        ],
      });
      i++;
    }
    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    };
  }
}

module.exports = new OrderServer();
