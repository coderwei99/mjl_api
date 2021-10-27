const Router = require("koa-router");

const router = new Router({ prefix: "/address" });

const {
  createAddress,
  findAddressList,
  updataAddress,
  removeAddress,
  setDeaultAddress,
} = require("../controller/address.controller");

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

// 获取地址列表
router.get("/", auth, findAddressList);

// 更新地址
router.put(
  "/:id",
  auth,
  addressFarmat({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  updataAddress
);

// 删除地址
router.delete("/:id", auth, removeAddress);

// 设置地址为默认地址
router.patch("/:id", auth, setDeaultAddress);
module.exports = router;
