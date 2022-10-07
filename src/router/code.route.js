const Router = require("koa-router");

const router = new Router({ prefix: "/codes" });

const {
  createCode,
  verificationCode
} = require("../controller/code.controller");

// 新建code
router.post(
  "/",
  createCode
);

// 查看code是否存在数据库
router.get(
  "/",
  verificationCode
);


module.exports = router;
