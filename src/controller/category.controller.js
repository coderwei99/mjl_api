const {
  create,
  getList,
  deleteCategory,
} = require("../server/category.server");

// 导入错误
const {
  createCategoryError,
} = require("../consitant/error/category.errorType");

// 导入工具函数
const { transArray } = require("../utils/ArrayToTree");

class CateGoryController {
  async createCategory(ctx, next) {
    try {
      console.log(ctx.request.body);
      const res = await create(ctx.request.body);
      ctx.body = {
        code: 200,
        data: res,
        message: "新增分类成功",
      };
    } catch (error) {
      console.log(error, "error");
      createCategoryError.result = error.errors;
      ctx.app.emit("error", createCategoryError, ctx);
    }
  }

  async getCategoryList(ctx, next) {
    const res = await getList();
    console.log(res, "res--");
    ctx.body = {
      code: 200,
      data: res,
      message: "获取分类列表成功",
    };
  }

  // 删除分类
  async removeCategory(ctx) {
    console.log(ctx.params);
    const res = await deleteCategory(ctx.params);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        message: "删除列表成功",
      };
    } else {
      ctx.body = {
        code: 210,
        data: res,
        message: "无效的id,请检查需要删除的分类是否有子分类",
      };
    }
  }
}

module.exports = new CateGoryController();
