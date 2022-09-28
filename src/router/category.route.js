const Router = require("koa-router");

const router = new Router({ prefix: "/categorys" });

const { auth } = require("../middleware/auth.middleware");
const {
  createCategory,
  getCategoryList
} = require("../controller/category.controller");

// 新建分类
router.post(
  "/",
  auth,
  createCategory
);

// 获取分类列表
router.post("/lists", getCategoryList)

module.exports = router;
