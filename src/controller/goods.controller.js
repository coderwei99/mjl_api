const path = require("path");

const {
  upLoadImageError,
  publishGoodsError,
  updataGoodsError,
} = require("../consitant/error/error.type");

const { createGoodError } = require("../consitant/error/goods.errorType")

const {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
  findCategoryGoodsList,
  getHotGoodsList,
} = require("../server/goods.server");
class GoodsController {
  async upLoad(ctx, next) {
    // ctx.body = "T1";
    const { file } = ctx.request.files;
    console.log(file);
    if (file) {
      ctx.body = {
        code: 200,
        message: "上传图片成功",
        data: {
          goods_img: path.basename(file.path),
        },
      };
    } else {
      ctx.app.emit("error", upLoadImageError, ctx);
    }
  }
  async create(ctx, next) {
    // ctx.body = "111";
    const goods = ctx.request.body;
    try {
      const res = await createGoods(goods);
      if (res) {
        ctx.body = {
          code: 200,
          message: "发布商品成功",
          data: res,
        };
      } else {
        ctx.app.emit("error", publishGoodsError, ctx);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updata(ctx) {
    try {
      const res = await updataGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 200,
          message: "修改商品成功",
          data: null,
        };
      } else {
        ctx.app.emit("error", updataGoodsError, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async remove(ctx) {
    const res = await removeGood(ctx.params.id);
    try {
      if (res) {
        ctx.body = {
          code: 200,
          message: "下架商品成功",
          data: null,
        };
      } else {
        ctx.app.emit("error", updataGoodsError, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async restore(ctx) {
    const res = await restoreGood(ctx.params.id);
    try {
      if (res) {
        ctx.body = {
          code: 200,
          message: "上架商品成功",
          data: null,
        };
      } else {
        ctx.app.emit("error", updataGoodsError, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, ...params } = ctx.request.body;

    const res = await findAllGoods(pageNum, pageSize, params);
    console.log(res, 'res-------------');
    res.list.forEach(item => {
      item.specification = JSON.parse(item.specification)
      item.swiper_image = JSON.parse(item.swiper_image)
      item.is_hot = !!item.is_hot
    })
    try {
      ctx.body = {
        code: 200,
        message: "获取商品列表成功",
        data: res,
      };
    } catch (err) {
      console.error(err);
    }
  }

  // 查询某个分类的商品
  async findCategoryGoods(ctx) {
    try {
      const res = await findCategoryGoodsList(ctx.request.query)
      console.log(res, 'res');
      if (res.list.length != 0) {
        res.list.forEach(item => {
          item.swiper_image = JSON.parse(item.swiper_image)
          item.specification = JSON.parse(item.specification)
        });
      }
      ctx.body = {
        code: 200,
        message: "获取分类商品成功",
        data: res
      }
    } catch (error) {
      console.log(error);
      createGoodError.data = error.errors
      ctx.app.emit("error", createGoodError, ctx)
    }
  }

  // 查询火热商品
  async findHotGoodsList(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const hotGoods = await getHotGoodsList(pageNum, pageSize)
    console.log('hotGoods', hotGoods);
    if (hotGoods.list.length != 0) {
      hotGoods.list.forEach(item => {
        item.swiper_image = JSON.parse(item.swiper_image)
        item.specification = JSON.parse(item.specification)
      });
    }

    ctx.body = {
      code: 200,
      message: "查询火热商品成功",
      data: hotGoods
    }
  }
}
module.exports = new GoodsController();
