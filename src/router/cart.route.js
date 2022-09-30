const Router = require("koa-router");

const router = new Router({ prefix: "/carts" });

const { diffChannelNo } = require("../middleware/auth.middleware");
const { cartFarmat } = require("../middleware/cart.middleware");
const {
  addGoods,
  getCartsGoods,
  patchCartsGoods,
  remove,
} = require("../controller/cart.controller");

// 商品加入到购物车
router.post(
  "/",
  diffChannelNo,
  cartFarmat({
    goods_id: {
      type: "number",
    },
  }),
  addGoods
);

// 查询购物车信息
router.get("/", diffChannelNo, getCartsGoods);

// 更新购物车信息
router.patch(
  "/:id",
  diffChannelNo,
  cartFarmat({
    number: {
      type: "number",
      required: false,
    },
    selected: {
      type: "bool",
      required: false,
    },
  }),
  patchCartsGoods
);

// 删除购物车的商品
router.delete(
  "/",
  diffChannelNo,
  cartFarmat({
    ids: "array",
  }),
  remove
);

module.exports = router;
