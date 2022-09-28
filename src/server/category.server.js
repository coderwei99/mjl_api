
const Category = require("../model/category.model");

class CategoryServer {
  // 创建分类
  async create({ parent_id, category_name }) {
    const result = await Category.create({ parent_id, category_name });
    console.log(result, 'result');
    return result;
  }

  // 获取分类列表
  async getList() {
    const result = await Category.findAll({
      attributes: ['id', 'parent_id', ['category_name', 'name']]
    })
    return result
  }

}

module.exports = new CategoryServer();
