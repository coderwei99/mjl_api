const Router = require("koa-router");

const router = new Router({ prefix: "/address" });

const { createAddress } = require("../controller/address.controller");

// 导入所需的中间件
const { auth } = require("../middleware/auth.middleware");
const { addressFarmat } = require("../middleware/address.middleware");
// 添加地址
router.post(
  "/",
  auth,
  addressFarmat({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  createAddress
);

module.exports = router;
