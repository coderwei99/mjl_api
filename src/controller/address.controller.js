const {
  create,
  findAll,
  updata,
  remove,
  setDeafultAction,
} = require("../server/address.server");

const { updataAddressError } = require("../consitant/error/error.type");
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

  async findAddressList(ctx) {
    const user_id = ctx.state.user.id;
    const { rows, count } = await findAll(user_id);
    ctx.body = {
      code: 0,
      message: "获取列表成功",
      total: count,
      result: rows,
    };
  }

  async updataAddress(ctx) {
    const user_id = ctx.state.user.id;
    const res = await updata(ctx.request.body, ctx.request.params.id, user_id);
    if (res) {
      ctx.body = {
        code: 0,
        message: "更新地址成功",
        result: res,
      };
    } else {
      ctx.app.emit("error", updataAddressError, ctx);
    }
  }

  async removeAddress(ctx) {
    const address_id = ctx.request.params.id;
    const user_id = ctx.state.user.id;
    const res = await remove({ address_id, user_id });
    ctx.body = {
      code: 0,
      message: "删除商品成功",
      result: res,
    };
  }

  async setDeaultAddress(ctx) {
    const address_id = ctx.request.params;
    const user_id = ctx.state.user.id;
    const res = setDeafultAction({ address_id, user_id });
    ctx.body = {
      code: 0,
      message: "设置地址为默认地址成功",
      result: res,
    };
  }
}

module.exports = new Address();
