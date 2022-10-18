const Router = require("koa-router");

const router = new Router({ prefix: "/categorys" });

const { diffChannelNo } = require("../middleware/auth.middleware");
const {
  createCategory,
  getCategoryList,
  removeCategory,
} = require("../controller/category.controller");

// 新建分类
router.post("/", diffChannelNo, createCategory);

// 获取分类列表
router.post("/lists", diffChannelNo, getCategoryList);

// 删除分类
router.delete("/:id", diffChannelNo, removeCategory);
module.exports = router;
