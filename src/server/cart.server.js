const { Op } = require("sequelize");

const User = require("../model/user_model");
const Goods = require("../model/goods_model");
const Cart = require("../model/cart_model");

class cartServer {
  async createOrUpdate({ user_id, goods_id, specification, count, name, unit_price }) {
    //-----------------------------start-----------------------------------------
    // 这个位置的两个判断条件可以考虑抽离成一个中间件，尽量保证createOrUpdate方法的职责单一

    // 判断用户id是否合法?  不合法返回1，在控制器进行判断
    const user_id_res = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user_id_res) return "1";

    // 判断商品id是否合法，不合法返回2，在控制器进行判断
    const goods_id_res = await Goods.findOne({
      where: {
        id: goods_id,
      },
    });
    if (!goods_id_res) return "2";

    //-----------------------------end-----------------------------------------

    // 传入的商品id和用户id都合法，这个时候就可以考虑更新数据库的数据
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
          specification_name: name
        },
      },
    });
    if (!res) {
      // 如果未查询到数据，就新增一条记录到购物车
      console.log('specification----------------', specification, name);
      const reslut = await Cart.create({ goods_id, user_id, specification, specification_name: name, count, unit_price });
      return reslut;
    } else {
      // 1. 如果查询到数据，考虑两种情况，
      //   - 如果是规格一样的话 更新cart的number数量 ===> 数据库的number数量+specification.count ----> 注意这里返回的是修改后的数据
      //   - 如果规格不一样  就说明新增一条数据到数据库  不同规格代表不同的商品
      // 规格一样的情况下 数据库的number数量+specification.count
      const reslut = await res.increment("count", { by: count });
      // 这里需要调用.reload()方法，因为increment返回的是更新前的数量，我们需要返回递增后的数据
      return await reslut.reload();

    }
  }

  async findCartsGoods({ pageNumber, pageSize, user_id }) {
    // return true;
    const offset = (pageNumber - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      where: {
        user_id,
      },
      attributes: ["id", "count", "selected", "specification_name", "unit_price"],
      limit: pageSize * 1,
      offset,
      include: {
        model: Goods,
        as: "goods_info",
      },
    });
    return {
      pageSize,
      pageNumber,
      total: count,
      list: rows,
    };
  }

  async updataCartsGood(params) {
    // console.log(params);
    const { id, number, selected } = params;
    console.log(params);
    const res = await Cart.findByPk(id);
    if (!res) return "";
    number ? (res.number = number) : "";
    // 这里不能简写成上面那个样子，因为传进来的就是布尔值，true和false都是需要执行更新数据库的，直接判断的话会导致用户传进来的false，不执行后面的赋值语句
    selected !== undefined ? (res.selected = selected) : "";
    return await res.save();
  }

  async removeCartsGoood(params) {
    const { user_id, goods_id } = params;
    console.log(user_id, goods_id);
    const res = await Cart.destroy({
      // 根据当前登录用户的id，删除当前用户id收藏的商品（goods_id）,这时正常逻辑，去数据库删除当前用户收藏的商品
      where: {
        user_id,
        goods_id: {
          [Op.in]: goods_id,
        },
      },
    });
    return res;
  }
}

module.exports = new cartServer();
