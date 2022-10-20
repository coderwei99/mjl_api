const Router = require("koa-router");

const router = new Router({ prefix: "/template" });

const { sendTemplate } = require("../controller/template.controller");

// 发送模板消息
router.post("/", sendTemplate);

module.exports = router;
