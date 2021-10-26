const { Op } = require("sequelize");

const User = require("../model/user_model");
const Goods = require("../model/goods_model");
const Cart = require("../model/cart_model");

class cartServer {
  async createOrUpdate({ user_id, goods_id }) {
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
        },
      },
    });
    if (!res) {
      // 如果为查询到数据，就新增一条记录到购物车
      const reslut = await Cart.create({ goods_id, user_id });
      return reslut;
    } else {
      // 如果查询到数据，就增加sql的number数量，调用increment方法 ---->递增，注意这里返回的是递增前的数据
      const reslut = await res.increment("number");
      // 这里需要调用.reload()方法，因为increment返回的是更新前的数量，我们需要返回递增后的数据
      return await reslut.reload();
    }
  }
}

module.exports = new cartServer();
