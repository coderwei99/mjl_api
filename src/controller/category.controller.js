const {
  create,
  getList,
  deleteCategory,
  updateCategory,
} = require("../server/category.server");

// 导入错误
const {
  createCategoryError,
  editCategoryError,
  deleteCategoryError,
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
    if (!res) return ctx.app.emit("error", deleteCategoryError, ctx);
    ctx.body = {
      code: 200,
      data: res,
      message: "删除列表成功",
    };
  }

  // 修改分类
  async editCategory(ctx) {
    const { id } = ctx.request.params;
    const { category_name, parent_id } = ctx.request.body;
    const res = await updateCategory({ id, category_name, parent_id }, ctx);
    if (res == "parent_id is not allow")
      return ctx.app.emit("error", deleteCategoryError, ctx);
    if (!res) return ctx.app.emit("error", editCategoryError, ctx);
    ctx.body = {
      code: 200,
      data: res,
      message: "修改分类成功",
    };
  }
}

module.exports = new CateGoryController();
