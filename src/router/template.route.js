const Router = require("koa-router");

const router = new Router({ prefix: "/template" });

const {
  sendTemplate,
} = require("../controller/template.controller");

// 商品加入到购物车
router.post(
  "/",
  sendTemplate
);



module.exports = router;
