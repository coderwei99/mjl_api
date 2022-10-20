const {
  create,
  findAll,
  updata,
  remove,
  setDeafultAction,
  findDefaultAddress,
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
      city_province,
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
      city_province,
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
    const user_id = ctx.request.query.user_id;
    const { rows, count } = await findAll(user_id);
    rows.forEach(item => {
      item.dataValues.district = JSON.parse(item.dataValues.district);
      item.dataValues.city = JSON.parse(item.dataValues.city);
      item.dataValues.province = JSON.parse(item.dataValues.province);
      item.dataValues.show = false;
    });
    ctx.body = {
      code: 200,
      message: "获取地址列表成功",
      total: count,
      data: { list: rows },
    };
  }

  // 更新地址信息
  async updataAddress(ctx) {
    const user_id = ctx.state.user.id;
    console.log("user_id---------", user_id);

    const address_info = ctx.request.body;
    address_info.district = JSON.stringify(address_info.district);
    address_info.city = JSON.stringify(address_info.city);
    address_info.province = JSON.stringify(address_info.province);

    const res = await updata(address_info, ctx.request.params.id, user_id);
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
    console.log(ctx.request.body, "------");
    const { user_id } = ctx.request.body;
    const res = await remove({ address_id, user_id });
    if (res > 0) {
      ctx.body = {
        code: 200,
        message: "删除地址成功",
        data: res,
      };
    } else {
      ctx.body = {
        code: 304,
        message: "没有找到对应的数据",
        data: res,
      };
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

  async getDefaultAddress(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const res = await findDefaultAddress(user_id);
      if (res) {
        res.district = JSON.parse(res.district);
        res.city = JSON.parse(res.city);
        res.province = JSON.parse(res.province);
        ctx.body = {
          code: 200,
          data: res,
        };
      } else {
        ctx.body = {
          code: 100010,
          data: {},
          message: "用户暂无默认地址",
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = new Address();
