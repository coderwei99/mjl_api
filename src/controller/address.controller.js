const {
  create,
  findAll,
  updata,
  remove,
  setDeafultAction,
} = require("../server/address.server");

const { updataAddressError } = require("../consitant/error/error.type");
class Address {

  // 用户添加地址
  async createAddress(ctx) {
    const {
      user_id,
      consignee,
      phone,
      district,
      city,
      province,
      detail,
      post_code,
      is_default,
      city_province
    } = ctx.request.body;
    const res = await create({
      user_id,
      consignee,
      phone,
      district,
      city,
      province,
      detail,
      post_code,
      is_default,
      city_province
    });
    if (res) {
      ctx.body = {
        code: 200,
        message: "添加地址成功",
        data: res,
      };
    } else {
      ctx.body = 0;
    }
  }

  // 获取用户地址列表
  async findAddressList(ctx) {
    const user_id = ctx.request.query.user_id
    const { rows, count } = await findAll(user_id);
    rows.forEach(item => {
      item.dataValues.district = JSON.parse(item.dataValues.district)
      item.dataValues.city = JSON.parse(item.dataValues.city)
      item.dataValues.province = JSON.parse(item.dataValues.province)
      item.dataValues.show = false
    })
    ctx.body = {
      code: 200,
      message: "获取地址列表成功",
      total: count,
      data: { list: rows },
    };
  }

  async updataAddress(ctx) {
    const user_id = ctx.state.user.id;
    const res = await updata(ctx.request.body, ctx.request.params.id, user_id);
    if (res) {
      ctx.body = {
        code: 200,
        message: "更新地址成功",
        data: res,
      };
    } else {
      ctx.app.emit("error", updataAddressError, ctx);
    }
  }

  async removeAddress(ctx) {
    const address_id = ctx.request.params.id;
    console.log(ctx.request.body, '------');
    const { user_id } = ctx.request.body;
    const res = await remove({ address_id, user_id });
    if (res > 0) {
      ctx.body = {
        code: 200,
        message: "删除地址成功",
        data: res,
      }
    } else {
      ctx.body = {
        code: 304,
        message: "没有找到对应的数据",
        data: res
      }
    }
  }

  async setDeaultAddress(ctx) {
    const address_id = ctx.request.params;
    const user_id = ctx.state.user.id;
    const res = setDeafultAction({ address_id, user_id });
    ctx.body = {
      code: 200,
      message: "设置地址为默认地址成功",
      data: res,
    };
  }
}

module.exports = new Address();
