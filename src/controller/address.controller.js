const { create } = require("../server/address.server");

class Address {
  async createAddress(ctx) {
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;
    const res = await create({ user_id, consignee, phone, address });
    if (res) {
      ctx.body = {
        code: 0,
        message: "添加地址成功",
        result: res,
      };
    } else {
      ctx.body = 0;
    }
  }
}

module.exports = new Address();
