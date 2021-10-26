const Router = require("koa-router");

const router = new Router({ prefix: "/cart" });

const { auth } = require("../middleware/auth.middleware");
const { cartFarmat } = require("../middleware/cart.middleware");
const { addGoods } = require("../controller/cart.controller");
router.post("/", auth, cartFarmat, addGoods);

module.exports = router;
