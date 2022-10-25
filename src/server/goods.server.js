const { Op } = require("sequelize");
const Goods = require("../model/goods_model");
const Uploads = require("../model/upload_model");

const { handleLike } = require("../utils/handleLike");
const createGoods = async goods => {
  goods.specification = JSON.stringify(goods.specification);
  goods.swiper_image = JSON.stringify(goods.swiper_image);
  console.log("swiper", goods.swiper_image);
  const res = await Goods.create(goods);
  return res;
};

const updataGoods = async (id, goodsInfo) => {
  goodsInfo.specification = JSON.stringify(goodsInfo.specification);
  goodsInfo.swiper_image = JSON.stringify(goodsInfo.swiper_image);
  const res = await Goods.update(goodsInfo, { where: { id } });
  return res[0] > 0 ? true : false;
};

const removeGood = async id => {
  const res = await Goods.destroy({ where: { id } });
  return res > 0 ? true : false;
};

const restoreGood = async id => {
  const res = await Goods.restore({ where: { id } });
  return res > 0 ? true : false;
};

// 返回某个分类的商品
const findCategoryGoodsList = async ({
  parentId: parent_id,
  pageNum = 1,
  pageSize = 10,
}) => {
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
    where: {
      parent_id,
    },
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };
};

// 返回所有商品列表
const findAllGoods = async (pageNum, pageSize, params) => {
  const {
    goods_name,
    // goods_price,
    // goods_num,
    // swiper_image,
    // min_count_elivery,
    is_hot,
    parent_id,
    // original_price,
    // is_benefit,
    // sales,
    // goods_img,
    // retail_price,
    // specification,
    sale_or_not,
  } = params;
  let where = {};
  goods_name && Object.assign(where, { goods_name });
  is_hot !== undefined && is_hot !== "" && Object.assign(where, { is_hot }); //is_hot本来就是布尔值  所以不能直接判断真假  需要判断是否为undefined 来确定前端有没有传递这个参数
  parent_id && Object.assign(where, { parent_id });
  sale_or_not && Object.assign(where, { sale_or_not });
  where = handleLike(where);
  console.log(where, "----");
  const offset = (pageNum - 1) * pageSize;
  const { count, rows } = await Goods.findAndCountAll({
    limit: pageSize * 1,
    offset,
    raw: true,
    where,
    paranoid: false,
    order: [["updatedAt", "DESC"]],
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
      is_hot: true,
      // deletedAt: {
      //   [Op.is]: null,
      // },
    },
    order: [["createdAt", "DESC"]],
  });
  return {
    pageNum,
    pageSize,
    total: count,
    list: rows,
  };
};

// 模糊查询
const findLikeGoodsList = async params => {
  console.log(params);
  const res = await Goods.findAndCountAll({});
};

// 上传图片
const uploadImage = async ({ name }, basename) => {
  console.log(basename);
  const url = basename;
  const image_key = basename.slice(7, 16);
  const res = await Uploads.create({ url, image_key, name });
  return res;
};
module.exports = {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
  findCategoryGoodsList,
  getHotGoodsList,
  findLikeGoodsList,
  uploadImage,
};
