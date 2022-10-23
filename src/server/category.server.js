const Category = require("../model/category.model");

class CategoryServer {
  // 创建分类
  async create({ parent_id, category_name }) {
    const result = await Category.create({ parent_id, category_name });
    console.log(result, "result");
    return result;
  }

  // 获取分类列表
  async getList() {
    const result = await Category.findAll({
      attributes: ["id", "parent_id", ["category_name", "label"]],
      raw: true,
    });
    return result;
  }

  // 删除分类
  async deleteCategory(params) {
    // 删除之前看下用户要删除的分类下面有没有子分类  有的话不允许用户删除
    const haveSonCategory = await Category.findOne({
      where: {
        parent_id: params.id,
      },
      raw: true,
    });
    if (haveSonCategory) return;
    const result = await Category.destroy({
      where: params,
    });

    return result == 1 ? true : false;
  }

  // 修改分类
  async updateCategory(params, ctx) {
    const { id, category_name, parent_id = 0 } = params;
    // 如果当前分类是一级菜单 不允许修改他的parent_id
    const categoryInfo = await Category.findByPk(id);
    // console.log(categoryInfo, "---");
    if (categoryInfo.dataValues.parent_id == 0 && parent_id)
      return "parent_id is not allow";

    console.log({ id, category_name, parent_id });
    const res = await Category.update(
      {
        category_name,
        parent_id,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(res, "----", res[0]);
    return res[0] ? true : false;
  }
}

module.exports = new CategoryServer();
