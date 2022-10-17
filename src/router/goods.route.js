const Router = require("koa-router");

const { diffChannelNo, hadAdminPermission } = require("../middleware/auth.middleware");
const {
  upLoad,
  create,
  updata,
  remove,
  restore,
  findAll,
  findCategoryGoods,
  findHotGoodsList,
} = require("../controller/goods.controller");

const { goodsFarmat } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });
// 商品图片上传： auth --->登录    hadAdminPermission ---> 是否拥有权限
router.post("/upload", diffChannelNo, hadAdminPermission, upLoad);

// 发布商品
router.post("/", goodsFarmat, create);

// 更新商品
router.patch("/:id", diffChannelNo, hadAdminPermission, goodsFarmat, updata);

// 下架商品
router.post("/:id/off", diffChannelNo, hadAdminPermission, remove);

// 上架商品
router.post("/:id/on", diffChannelNo, hadAdminPermission, restore);

// 查询所有商品数据 模糊查询
router.post("/list", findAll);

// 查询某个分类的商品数据
router.get("/categoryList", findCategoryGoods);

// 查询火热商品列表 用于展示在首页
router.get("/hotGoodsList", findHotGoodsList)

module.exports = router;
