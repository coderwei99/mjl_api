const Router = require("koa-router");

const {
  register,
  login,
  changePassword,
  wxLogin
} = require("../controller/user.controller");

const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/users" });

// 用户注册
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 用户登录
router.post("/login", userValidator, verifyLogin, login);

// 修改密码
router.patch("/", auth, cryptPassword, changePassword);

// 小程序用户登录
router.post("/wxLogin", wxLogin)

module.exports = router;
