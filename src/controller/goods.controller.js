const path = require("path");
const fs = require("fs");
const {
  upLoadImageError,
  publishGoodsError,
  updataGoodsError,
} = require("../consitant/error/error.type");

const {
  createGoodError,
  unSupportedFileType,
  removeUploadImageError,
} = require("../consitant/error/goods.errorType");

const {
  createGoods,
  updataGoods,
  removeGood,
  restoreGood,
  findAllGoods,
  findCategoryGoodsList,
  getHotGoodsList,
  uploadImage,
} = require("../server/goods.server");

const { findFileInfo, deleteImage } = require("../server/upload.server");

class GoodsController {
  async upLoad(ctx, next) {
    // ctx.body = "T1";
    const { file } = ctx.request.files;
    console.log(file);
    const fileTypes = ["image/jpeg", "image/png"];
    if (file) {
      if (!fileTypes.includes(file.type))
        return ctx.app.emit("error", unSupportedFileType, ctx);
      const basename = path.basename(file.path);
      const res = await uploadImage(file, basename);
      if (!res) return ctx.app.emit("error", upLoadImageError, ctx);
      ctx.body = {
        code: 200,
        message: "上传图片成功",
        data: {
          ...res.dataValues,
          goods_img: `${ctx.origin}/images/${basename}`,
        },
      };
    } else {
      ctx.app.emit("error", upLoadImageError, ctx);
    }
  }

  async removeUpload(ctx) {
    try {
      let { id } = ctx.request.body;
      // const res_code = fs.unlinkSync(url);
      let { url } = await findFileInfo(id);
      // const deleteImageRes = await deleteImage(image_key);
      url = path.join(__dirname, "../images/") + url;
      if (!fs.existsSync(url))
        return ctx.app.emit("error", removeUploadImageError, ctx);

      //在服务器这出这张图片
      fs.unlinkSync(url);

      // 在数据库删除这条记录
      const res = await deleteImage(id);
      if (!res) return ctx.app.emit("error", removeUploadImageError, ctx);
      ctx.body = {
        code: 200,
        data: res,
        message: "删除图片成功",
      };
    } catch (error) {
      console.error("remove uplaod image error", error);
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
    console.log(ctx.params.id, "id");
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
    try {
      const { pageNum = 1, pageSize = 10, ...params } = ctx.request.body;
      const res = await findAllGoods(pageNum, pageSize, params);
      console.log(res, "res-------------");
      res.list.forEach(item => {
        item.specification = JSON.parse(item.specification);
        item.swiper_image = JSON.parse(item.swiper_image);
        item.is_hot = !!item.is_hot;
      });
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
      const res = await findCategoryGoodsList(ctx.request.query);
      console.log(res, "res");
      if (res.list.length != 0) {
        res.list.forEach(item => {
          item.swiper_image = JSON.parse(item.swiper_image);
          item.specification = JSON.parse(item.specification);
        });
      }
      ctx.body = {
        code: 200,
        message: "获取分类商品成功",
        data: res,
      };
    } catch (error) {
      console.log(error);
      createGoodError.data = error.errors;
      ctx.app.emit("error", createGoodError, ctx);
    }
  }

  // 查询火热商品
  async findHotGoodsList(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const hotGoods = await getHotGoodsList(pageNum, pageSize);
    console.log("hotGoods", hotGoods);
    if (hotGoods.list.length != 0) {
      hotGoods.list.forEach(item => {
        item.swiper_image = JSON.parse(item.swiper_image);
        item.specification = JSON.parse(item.specification);
      });
    }

    ctx.body = {
      code: 200,
      message: "查询火热商品成功",
      data: hotGoods,
    };
  }
}
module.exports = new GoodsController();
