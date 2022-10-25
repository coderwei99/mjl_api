module.exports = {
  createCategoryError: {
    code: "11500",
    message: "新增分类失败",
    data: null,
  },
  editCategoryError: {
    code: "11501",
    message: "请检查分类id",
    data: null,
  },
  deleteCategoryError: {
    code: "11501",
    message: "请检查需要删除的分类是否有子分类",
    data: null,
  },
  deleteCategoryHaveGoodsError: {
    code: "11501",
    message: "无法删除,该分类下拥有商品",
    data: null,
  },
};
