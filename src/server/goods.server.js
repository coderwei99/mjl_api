const Goods = require("../model/goods_model");

const createGoods = async (goods) => {
  goods.specification = JSON.stringify(goods.specification)
  goods.swiper_image = JSON.stringify(goods.swiper_image)
  console.log('swiper', goods.swiper_image);
  const res = await Goods.create(goods);
  return res;
};

const updataGoods = async (id, goodsInfo) => {
  goodsInfo.specification = JSON.stringify(goodsInfo.specification)
  goodsInfo.swiper_image = JSON.stringify(goodsInfo.swiper_image)
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


// 返回某个分类的商品
const findCategoryGoodsList = async ({ parentId: parent_id, pageNum = 1, pageSize = 10 }) => {
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
    where: {
      parent_id,
    }
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };
};



// 返回所有商品列表
const findAllGoods = async (pageNum, pageSize) => {
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
    raw: true,
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };
};


// 去数据库查询首页所需要的火热商品
const getHotGoodsList = async (pageNum, pageSize) => {
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
    where: {
      is_hot: true
    }
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };

}

module.exports = {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
  findCategoryGoodsList,
  getHotGoodsList
};
