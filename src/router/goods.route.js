const Router = require("koa-router");

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const {
  upLoad,
  create,
  updata,
  remove,
  restore,
  findAll,
  findCategoryGoods,
  findHotGoodsList
} = require("../controller/goods.controller");

const { goodsFarmat } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });
// 商品图片上传： auth --->登录    hadAdminPermission ---> 是否拥有权限
router.post("/upload", auth, hadAdminPermission, upLoad);

// 发布商品
router.post("/", goodsFarmat, create);

// 更新商品
router.put("/:id", auth, hadAdminPermission, goodsFarmat, updata);

// 下架商品
router.post("/:id/off", auth, hadAdminPermission, remove);

// 上架商品
router.post("/:id/on", auth, hadAdminPermission, restore);

// 查询所有商品数据
router.get("/list", findAll);

// 查询某个分类的商品数据
router.get("/categoryList", findCategoryGoods);

// 查询火热商品列表 用于展示在首页
router.get("/hotGoodsList", findHotGoodsList)

module.exports = router;
