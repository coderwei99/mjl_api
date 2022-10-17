
const {
  create,
  getList
} = require('../server/category.server')

// 导入错误
const { createCategoryError } = require("../consitant/error/category.errorType")

// 导入工具函数
const { transArray } = require("../utils/ArrayToTree")

class CateGoryController {
  async createCategory(ctx, next) {
    try {
      console.log(ctx.request.body);
      const res = await create(ctx.request.body)
      ctx.body = {
        code: 200,
        data: res,
        message: "新增分类成功"
      }
    } catch (error) {
      console.log(error, 'error');
      createCategoryError.result = error.errors
      ctx.app.emit("error", createCategoryError, ctx);
    }
  }

  async getCategoryList(ctx, next) {
    const res = await getList()
    ctx.body = {
      code: 200,
      data: res,
      message: "获取分类列表成功"
    }
  }
}

module.exports = new CateGoryController();
