const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");
const router = new Router({ prefix: "/users" });

// 用户注册
router.post("/register", register);

// 用户登录
router.post("/login", login);
module.exports = router;
