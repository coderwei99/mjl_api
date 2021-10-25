const Router = require("koa-router");

const router = new Router({ prefix: "/cart" });

const { auth } = require("../middleware/auth.middleware");
const { cartFarmat } = require("../middleware/cart.middleware");
router.post("/", auth, cartFarmat, (ctx) => {
  ctx.body = ctx.state.user;
});

module.exports = router;
