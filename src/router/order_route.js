const Router = require("koa-router");

const { diffChannelNo } = require("../middleware/auth.middleware");
const {
  createOeder,
  getUserOrderList,
  updataOrder,
  getOrderList,
} = require("../controller/order.controller");
const { ordersFarmat } = require("../middleware/order_middleware");

const router = new Router({ prefix: "/orders" });

// 创建订单
router.post("/", diffChannelNo, createOeder);

// 查询用户订单
router.get("/", diffChannelNo, getUserOrderList);

// 更新订单：这里我们主要是更新订单的状态
router.put("/:id", diffChannelNo, updataOrder);

// 获取订单列表
router.post("/list", getOrderList);

module.exports = router;
