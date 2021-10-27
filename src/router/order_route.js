const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const {
  createOeder,
  getOrderList,
  updataOrder,
} = require("../controller/order.controller");
const { ordersFarmat } = require("../middleware/order_middleware");

const router = new Router({ prefix: "/orders" });

// 创建订单
router.post(
  "/",
  auth,
  ordersFarmat({
    address_id: "int",
    goods_info: "string",
    total: "string",
  }),
  createOeder
);

// 查询订单
router.get("/", auth, getOrderList);

// 更新订单：这里我们主要是更新订单的状态
router.patch("/:id", auth, updataOrder);
module.exports = router;
