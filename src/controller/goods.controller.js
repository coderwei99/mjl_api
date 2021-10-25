const path = require("path");

const {
  upLoadImageError,
  publishGoodsError,
  updataGoodsError,
} = require("../consitant/error.type");
const {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
} = require("../server/goods.server");
class GoodsController {
  async upLoad(ctx, next) {
    // ctx.body = "T1";
    const { file } = ctx.request.files;
    console.log(file);
    if (file) {
      ctx.body = {
        code: 0,
        message: "上传图片成功",
        result: {
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
      console.log(111);
      if (res) {
        ctx.body = {
          code: 0,
          message: "发布商品成功",
          result: res,
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
          code: 0,
          message: "修改商品成功",
          result: null,
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
          code: 0,
          message: "下架商品成功",
          result: null,
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
          code: 0,
          message: "上架商品成功",
          result: null,
        };
      } else {
        ctx.app.emit("error", updataGoodsError, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;

    const res = await findAllGoods(pageNum, pageSize);
    try {
      ctx.body = {
        code: 0,
        message: "获取商品列表成功",
        result: res,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
module.exports = new GoodsController();
