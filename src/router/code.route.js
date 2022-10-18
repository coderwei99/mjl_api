const Router = require("koa-router");

const router = new Router({ prefix: "/codes" });
const { diffChannelNo } = require("../middleware/auth.middleware");

const {
  createCode,
  verificationCode,
  getCodeList,
} = require("../controller/code.controller");

// 新建code
router.post("/", diffChannelNo, createCode);

// 查看code是否存在数据库
router.get("/", verificationCode);

// 获取邀请码列表
router.post("/list", diffChannelNo, getCodeList);

module.exports = router;
