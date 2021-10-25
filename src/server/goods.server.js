const Goods = require("../model/goods_model");

const createGoods = async (goods) => {
  const res = await Goods.create(goods);
  return res;
};

const updataGoods = async (id, goodsInfo) => {
  const res = await Goods.update(goodsInfo, { where: { id } });
  return res[0] > 0 ? true : false;
};

const removeGood = async (id) => {
  const res = await Goods.destroy({ where: { id } });
  return res > 0 ? true : false;
};

const restoreGood = async (id) => {
  const res = await Goods.restore({ where: { id } });
  return res > 0 ? true : false;
};

const findAllGoods = async (pageNum, pageSize) => {
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };
};
module.exports = {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
};
