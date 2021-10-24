const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");
const {
  userValidator,
  verifyUser,
  cryptPassword,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

// 用户注册
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 用户登录
router.post("/login", login);
module.exports = router;
