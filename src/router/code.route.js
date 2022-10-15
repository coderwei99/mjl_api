const Router = require("koa-router");

const router = new Router({ prefix: "/codes" });

const {
  createCode,
  verificationCode,
  getCodeList
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

// 获取邀请码列表
router.get("/list", getCodeList)

module.exports = router;
